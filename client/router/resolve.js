import toRegex from 'path-to-regexp'

const matchURI = (path, uri) => {
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

const findRoute = (routes, context) =>
  routes.reduce(
    (match, route) => {
      const uri = context.error ? '/error' : context.pathname
      const params = matchURI(route.path, uri)
      return !match.route && params ? { route, params } : match
    },
    { route: null, params: {} }
  )

const statusError = (message, status) =>
  Object.assign(new Error(message), { status })

export const resolve = (routes, context, state) =>
  new Promise((resolve, reject) => {
    const { route, params } = findRoute(routes, context)

    if (route && route.isProtected && !state.auth.isAuthenticated) {
      reject(statusError('Unauthorized', 401))
    } else {
      try {
        const redirect =
          route && typeof route.redirect === 'function'
            ? route.redirect(state)
            : route && (route.redirect || null)

        const component =
          route && route.action
            ? route.action({ ...context, params, state })
            : null

        redirect || component
          ? resolve({ redirect, component })
          : reject(statusError('Not found', 404))
      } catch (e) {
        reject(e) // Need to handle this differently before production
      }
    }
  })

export default resolve
