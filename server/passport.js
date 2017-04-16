const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy
const config = require('./config')
const { isTaskstreamEmail } = require('./utilities')
const { call } = require('./db')
const bcrypt = require('bcrypt')
const chalk = require('chalk')

passport.use(new LocalStrategy({ usernameField: 'email' },
  (email, password, done) => {
      call.getHash({ email })
        .then(({ output }) =>  bcrypt.compare(password, output[0][0].hash))
        .then(authenticated => {
          if (authenticated) {
            done(null, email)
          } else {
            done(null, false, { message: 'Invalid email or password.' })
          }
        })
        .catch(done)

  }
))

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: config.auth.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      const fullProfile = profile._json
      const { name, emails, image } = fullProfile
      const user = {
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
        photoUrl: image.isDefault ? null : image.url
      }
      console.log(chalk.red(JSON.stringify(fullProfile, null, 4)), chalk.blue(JSON.stringify(user, null, 4)))
      // for (const key in profile) console.log(key, chalk.green(JSON.stringify(profile[key], null, 4)))
      // console.log(chalk.yellow(JSON.stringify(profile.json(), null, 4)))
      if (isTaskstreamEmail(user.email)) {
        call.updateOrCreateUser(user)
          .then(() => {
            done(null, user.email)
          })
      } else {
        call.updateUserIfExists(user)
          .then(({ exists }) => {
            if (exists) {
              done(null, user.email)
            } else {
              done(null, false, { message: 'non taskstream email'})
            }
          })
    }
  }
))

passport.serializeUser((email, done) => {
    done(null, email)
})

passport.deserializeUser((email, done) => {
  call.getUserByEmail({ email })
    .then(({ output }) => {
      const { id, firstName, lastName, isAdmin } = output[0][0]
      done(null, { id, email, firstName, lastName, isAdmin: !!isAdmin })
    })
    .catch(done)
})

module.exports = passport
// passport.use(new GoogleStrategy({
//     clientID:     process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://yourdormain:3000/auth/google/callback',
//     passReqToCallback: true
//   },
//   (req, accessToken, refreshToken, profile, done) => {
//     call.findOrCreateUser({ googleId: profile.id })
//       .then(({ output }) => done(null, output[0][0]))
//       .catch(done)
//   })
// )
