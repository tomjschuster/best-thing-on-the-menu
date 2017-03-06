const setParams = (params = [], provided = {}) =>
  Object.keys(provided)
    .filter(param => params.indexOf(param) + 1)
    .map(param => {
      const value = provided[param]
      const typedValue = typeof value === 'string' ? `'${value}'` : value
      return `SET @${param} = ${typedValue}; `
    })
    .join('')

const callParams = (params, provided = {}) =>
  params.outParams.concat(
    Object.keys(provided)
      .filter(param => params.inParams.indexOf(param) + 1)
    )
    .map(param => `@${param}`)
    .join(', ')

const callProc = (proc, params, provided) =>
  `CALL ${proc}(${callParams(params, provided)}); `

const selectParams = (params = [], provided = []) =>
  provided
    .filter(param => params.indexOf(param) + 1)
    .map(param => `SELECT @${param}; `)
    .join('')
    .trim()

const callMysql = config => {
  return new Proxy(config, {
    get: (target, name) => {
      if (!(name in target)) {
        throw Error(`Configuration for stored procedure '${name} not found.`)
      }
      return (inParams, outParams) => {
        const params = target[name]
        const query = setParams(params.inParams, inParams) +
        callProc(name, params, inParams) +
        selectParams(params.outParams, outParams)
        return query.trim()
      }
    }
  })
}

module.exports = callMysql
