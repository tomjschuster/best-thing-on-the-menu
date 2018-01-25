const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const config = require('../config')
const { emailHasValidDomain } = require('../utilities')
const db = require('../../db')
const bcrypt = require('bcrypt')

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    db.call
      .getHash({ email })
      .then(
        ({ output: [[user]] }) =>
          user ? bcrypt.compare(password, user.hash) : false
      )
      .then(authenticated => {
        if (authenticated) done(null, email)
        else done(null, false, { message: 'Invalid email or password.' })
      })
      .catch(done)
  })
)

passport.use(
  new GoogleStrategy(
    {
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

      const validateEmail = JSON.parse(process.env.VALIDATE_EMAIL)
      if (validateEmail) {
        db.call
          .getValidDomains()
          .then(({ output }) => {
            if (emailHasValidDomain(user.email, output[0])) {
              db.call.updateOrCreateUser(user).then(() => {
                done(null, user.email)
              })
            } else {
              db.call
                .updateUserIfExists(user)
                .then(x => {
                  if (x.userExists) {
                    done(null, user.email)
                  } else {
                    done(null, false, { message: 'invalid email' })
                  }
                })
                .catch(err => {
                  done(false, null, { message: 'error fetching user' })
                })
            }
          })
          .catch(() => {
            done(false, null, { message: 'error fetching domains' })
          })
      } else {
        db.call.updateOrCreateUser(user).then(() => {
          done(null, user.email)
        })
      }
    }
  )
)

passport.serializeUser((email, done) => {
  done(null, email)
})

passport.deserializeUser((email, done) => {
  db.call
    .getUserByEmail({ email })
    .then(({ output: [[user]] }) => {
      if (user) done(null, { id: user.id, email, isAdmin: !!user.isAdmin })
      else done(false, null, { message: 'user not found' })
    })
    .catch(done)
})

module.exports = passport
