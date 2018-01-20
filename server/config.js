const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisOptions = {
  // url: 'redis://h:pe80cfcaf9401070f91ee3baab088fee6bd5212b50bff4930b83e2c4683de63aa@ec2-34-205-95-200.compute-1.amazonaws.com:28139',
  url: process.env.REDIS_URL || 'redis://localhost:6379'
  // host: process.env.REDIS_HOST || '127.0.0.1',
  // port: process.env.REDIS_PORT || 6379,
  // user: process.env.REDIS_USER || null,
  // pass: process.env.REDIS_PASS || null
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
