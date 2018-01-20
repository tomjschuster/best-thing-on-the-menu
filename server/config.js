const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisOptions = {
  url: process.env.REDIS_URL || 'redis://localhost:6379'
}

const cookie = {
   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
   maxAge: 1000 * 60 * 60 * 24
}

const sessionConfig = {
  store: new RedisStore(redisOptions),
  secret: process.env.SESSION_SECRET,
  cookie
}

const auth = {
  GOOGLE_CALLBACK_URL: '/api/auth/google/callback'
}

module.exports = { sessionConfig, auth }
