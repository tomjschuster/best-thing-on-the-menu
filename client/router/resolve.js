import toRegex from 'path-to-regexp'

function matchURI(path, uri) {
  const keys = []
  const pattern = toRegex(path, keys)
  const match = pattern.exec(uri)
  return match === null
    ? null
    : match.slice(1).reduce(
        (params, param, idx) => ({
          ...params,
          [keys[idx].name]: param
        }),
        {}
      )
}

export const resolve = (routes, context, isAuthenticated) => {
  const { route, params } = routes.reduce(
    (match, route) => {
      const uri = context.error ? '/error' : context.pathname
      const params = matchURI(route.path, uri)
      return !match.route && params ? { route, params } : match
    },
    { route: null, params: {} }
  )

  if (route) {
    return new Promise((resolve, reject) => {
      if (route.isProtected && !isAuthenticated) {
        reject(Object.assign(new Error('Not authenticated'), { status: 401 }))
      } else {
        try {
          resolve(route.action({ ...context, params }))
        } catch (e) {
          reject(e) // Need to handle this differently before production
        }
      }
    })
  }
  const error = Object.assign(new Error('Not found'), { status: 404 })
  return Promise.reject(error)
}

export default resolve
