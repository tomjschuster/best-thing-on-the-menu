const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy
const config = require('./config')
const { emailHasValidDomain } = require('./utilities')
const { call } = require('./db')
const bcrypt = require('bcrypt')

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

passport.use(
  new GoogleStrategy({
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

    // TO DO: Refactor with async
    if (process.env.VALIDATE_EMAIL) {
      call.getValidDomains()
        .then(({ output }) => {
          if (emailHasValidDomain(user.email, output[0])) {
            call.updateOrCreateUser(user)
              .then(() => {
                done(null, user.email)
              })
          } else {
            console.log('here')
            call.updateUserIfExists(user)
              .then((x) => {
                console.log('exists', x)
                if (x.userExists) {
                  done(null, user.email)
                } else {
                  done(null, false, { message: 'invalid email'})
                }
              })
              .catch(err => {
                console.log('what happened?', err)
                done(false, null, { message: 'error fetching user'})
              })
          }
        })
        .catch(() => { done(false, null, { message: 'error fetching domains'}) })
    } else {
      call.updateOrCreateUser(user)
        .then(() => {
          done(null, user.email)
        })
    }
  }
))

passport.serializeUser((email, done) => {
    done(null, email)
})

passport.deserializeUser((email, done) => {
  if (email) {
    call.getUserByEmail({ email })
      .then(({ output }) => {
        if (output[0][0]) {
          const { id, firstName, lastName, isAdmin } = output[0][0]
          done(null, { id, email, firstName, lastName, isAdmin: !!isAdmin })
        } else {
          done(false, null, { message: 'user not found'})
        }
      })
      .catch(done)
  } else {
    done(false, null, { message: 'no email' })
  }
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
