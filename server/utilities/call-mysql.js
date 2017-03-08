const setParams = (indParams = []) =>
  indParams
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
      outParams[param] = results[idx][0][`@${param}`]
      return outParams
    }, {})
  } else {
    return {}
  }
}

const callMysql = (db, config) => {
  return new Proxy(config, {
    get: (target, name) => {
      if (!(name in target)) {
        throw Error(`Configuration for stored procedure '${name} not provided.`)
      }
      return (inParams) => {
        const configParams = target[name]
        const query =
          setParams(configParams.inParams) +
          callProc(name, configParams) +
          selectParams(configParams.outParams)
        const placeHolderValues = configParams.inParams.map(param => inParams[param])

        return db.query(query.trim(), placeHolderValues)
                .then(response => {
                  const filteredResponse = response.filter(result => Array.isArray(result))
                  const splitIdx = filteredResponse.length - configParams.outParams.length
                  const results = filteredResponse.slice(0, splitIdx)
                  const outParamsResults = filteredResponse.slice(splitIdx)
                  const outParams = getOutParams(configParams.outParams, outParamsResults)

                  return { results, outParams }
                })
                .catch(err => { throw err })
      }
    }
  })
}

module.exports = callMysql
