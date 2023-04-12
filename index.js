const path = require('path');
const express = require('express')
const authRoutes = require('./api/routes/users')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/auth', authRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})