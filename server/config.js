const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisOptions = {
  url: process.env.REDIS_URL || 'redis://localhost:6379'
}

const cookie = {
  httpOnly: true,
  // secure: true, // When https is ready
  maxAge: 10000 * 60 * 5 // 10 minutes
}

const sessionConfig = {
  store: new RedisStore(redisOptions),
  secret: process.env.SESSION_SECRET,
  rolling: true,
  saveUninitialized: false,
  resave: false,
  cookie
}

const auth = {
  GOOGLE_CALLBACK_URL: '/auth/google/callback'
}

module.exports = { sessionConfig, auth }
