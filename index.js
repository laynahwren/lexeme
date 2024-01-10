const path = require('path');
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const authRoutes = require('./api/routes/users')
const apiRoutes = require('./api/routes/userItems')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, './client/build')))

// Set up Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
)

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})