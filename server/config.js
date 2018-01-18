const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisOptions = {
  host: '127.0.0.1',
  port: 6379
}

const cookie = {
   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
   maxAge: 1000 * 60 * 60 * 24
}

const sessionConfig = {
  store: new RedisStore(redisOptions),
  secret: 'supersecret',
  cookie
}

const auth = {
  GOOGLE_CALLBACK_URL: '/api/auth/google/callback'
}

module.exports = { sessionConfig, auth }
