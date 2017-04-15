const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const chalk = require('chalk')
const session = require('express-session')

const app = express()
const router = require('./api')
const passport = require('./passport')
const PORT = process.env.PORT || 3001



app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(morgan('dev'))
   .use(express.static(path.join(__dirname, '..', 'public')))
   .use(session({ secret: 'supersecret' }))
   .use(passport.initialize())
   .use(passport.session())
   .use((req, res, next) => {
    console.log(chalk.grey('isAuthenticated:', !!req.isAuthenticated()))
    console.log(chalk.magenta('req.user:', JSON.stringify(req.user, 2)))
    next()
  })
   .use('/api', router)

const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html')

app.get('/auth/check', (req, res) => {
  const isAuthenticated = req.isAuthenticated()
  const id = req.user !== undefined ? req.user.id : null
  res.send({ isAuthenticated, id })
})

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback', passport.authenticate('google',
    { successRedirect: '/explore', failureRedirect: '/' }
))

app.post('/auth/local', passport.authenticate('local'), (req, res, next) => res.send(req.session))


app.get('/check/req', (req, res) => res.send(req.session))

app.get('*', (req, res, next) => res.sendFile(indexHtmlPath))

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(PORT, () =>
  console.log(chalk.italic.magenta(`Server listening on ${PORT}...`))
  )
