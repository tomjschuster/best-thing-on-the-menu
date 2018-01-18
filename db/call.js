const snakeCase = require('snake-case')
const camelCase = require('camelcase')

const snakeConfig = config => ({
  inParams: config.inParams.map(snakeCase),
  outParams: config.outParams.map(snakeCase)
})

const camelProps = value => {
  if (Array.isArray(value)) {
    return value.map(camelProps)
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((output, key) => {
      output[camelCase(key)] = camelProps(value[key])
      return output
    }, {})
  }
  return value
}


const setParams = (inParams = []) =>
  inParams
    .map(param => `SET @${param} = ?; `)
    .join('')

const callParams = (params) =>
  params.outParams.concat(params.inParams)
    .map(param => `@${param}`)
    .join(', ')

const callProc = (name, params) =>
  `CALL ${name}(${callParams(params)}); `

const selectParams = (outParams = []) =>
  outParams
    .map(param => `SELECT @${param}; `)
    .join('')

const getOutParams = (params, results) => {
  if (params.length) {
    return params.reduce((outParams, param, idx) => {
      outParams[param] = results[idx][0][`@${snakeCase(param)}`]
      return outParams
    }, {})
  } else {
    return {}
  }
}

class Output extends Array {
  constructor(resultsArray) {
    return resultsArray
  }
  get first() {
    return this[0]
  }
}

module.exports = (db, config) => {
  return new Proxy(config, {
    get: (target, name) => {
      if (!(name in target)) {
        throw Error(`Configuration for stored procedure '${name} not provided.`)
      }
      return (inParams) => {
        const configParams = target[name]
        const snakeConfigParams = snakeConfig(configParams)


        const query =
          setParams(snakeConfigParams.inParams) +
          callProc(name, snakeConfigParams) +
          selectParams(snakeConfigParams.outParams)
        const placeHolderValues = configParams.inParams.map(param => inParams[param])
        return db.query(query.trim(), placeHolderValues)
                .then(response => {
                  const results = response.filter(result => Array.isArray(result))
                  const splitIdx = results.length - configParams.outParams.length

                  const camelResults = camelProps(results.slice(0, splitIdx))
                  const output = new Output(camelResults)
                  const outParamsResults = results.slice(splitIdx)
                  const outParams = getOutParams(configParams.outParams, outParamsResults)

                  return Object.assign({}, { output }, outParams)
                })
                .catch(err => { throw err })
      }
    }
  })
}
