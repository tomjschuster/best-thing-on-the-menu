const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
const config = require('./config')
const { call } = require('./db')


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: config.auth.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
        // call.findOrCreateUserByGoogle(({ googleId: profile.id }))
        console.log(JSON.stringify(profile))
        process.nextTick(() => done(null, {email: profile.emails[0].value}))
    }
))

passport.serializeUser((user, done) => {
  console.log(JSON.stringify(user))
    done(null, user)
})

passport.deserializeUser((user, done) => {
  console.log(JSON.stringify(user))
  done(null, user)
  // call.getUser({ id })
  //   .then(({ output }) => {
  //     done(null, output.first)
  //   })
  //   .catch(done)
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
