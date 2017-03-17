const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const chalk = require('chalk')
const session = require('express-session');

const app = express()
const router = require('./api')
const passport = require('./passport')
const PORT = process.env.PORT || 3001



app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(morgan('dev'))
   .use(express.static(path.join(__dirname, '..', 'public')))
   .use('/api', router)
   .use(passport.initialize())
   .use(passport.session())
   .use(session({ secret: 'supersecret' }))

const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html')

app.get('/auth/google', passport.authenticate('google', { scope: 'email' }))

app.get('/auth/google/callback', passport.authenticate('google',
    { successRedirect: '/', failureRedirect: '/places/1' }
))

app.get('/check/req', (req, res) => res.send(req.session))

app.get('*', (req, res, next) => res.sendFile(indexHtmlPath))

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(PORT, () =>
  console.log(chalk.italic.magenta(`Server listening on ${PORT}...`))
  )
