const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const chalk = require('chalk')
const session = require('express-session')
const sessionConfig = require('./config').sessionConfig

const app = express()
const router = require('./api')
const passport = require('./passport')
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(morgan('dev'))
   .use(express.static(path.join(__dirname, '..', 'public')))
   .use(session(sessionConfig))
   .use(passport.initialize())
   .use(passport.session())
   .use((req, res, next) => {
    console.log(chalk.grey('isAuthenticated:', !!req.isAuthenticated()))
    console.log(chalk.magenta('req.user:', JSON.stringify(req.user, 2)))
    next()
  })
   .use('/api', router)

const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html')

app.get('*', (req, res, next) => res.sendFile(indexHtmlPath))

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.message)
})

app.listen(PORT, () =>
  console.log(chalk.italic.magenta(`Server listening on ${PORT}...`))
  )
