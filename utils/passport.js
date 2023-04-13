const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../api/db/connect')
const { validatePassword } = require('./authenticate')

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            let collection = await db.collection('users')
            let res = await collection.findOne({email: email})
            if (!res) {
                return done(null, false, {
                    message: "Incorrect email"
                })
            } else if (!validatePassword(password, res.password)) {
                return done(null, false, {
                    message: "Incorrect password"
                })
            } else {
                return done(null, res)
            }
        } catch (err) {
            done(err)
        }
    }
))

passport.serializeUser( (user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done (null, user)
})

module.exports = passport