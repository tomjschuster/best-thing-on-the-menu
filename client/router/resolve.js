import toRegex from 'path-to-regexp'


function matchURI(path, uri) {
  const keys = []
  const pattern = toRegex(path, keys)
  const match = pattern.exec(uri)
  return match === null ? null :
    match.slice(1).reduce((params, param, idx) => ({
      ...params, [keys[idx].name]: param
    }), {})
}

export const resolve = (routes, context) => {
  const route = routes.reduce((match, route) => {
    const uri = context.error ? '/error' : context.pathname
    const params = matchURI(route.path, uri)
    return !match && params ?
      new Promise((resolve, reject) => {
          try {
            resolve(route.action({ ...context, params }))
          } catch (e) {
            reject(e)
          }
        }) : match
  }, null)
  if (route) {
    return route
  }
  const error = Object.assign(new Error('Not found', { status: 404 }))
  return Promise.reject(error)
}

// async function resolve(routes, context) {
//   for (const route of routes) {
//     const uri = context.error ? '/error' : context.pathname
//     const params = matchURI(route.path, uri)
//     if (!params) continue
//     const result = await route.action({ ...context, params })
//     if (result) return result
//   }
//   const error = new Error('Not found')
//   error.status = 404
//   throw error
// }

export default resolve
