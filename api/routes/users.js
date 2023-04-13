const express = require('express')
const passport = require('../../utils/passport')
const db = require('../db/connect')
const { hashPassword } = require('../../utils/authenticate')

const router = express.Router()

// Get user
// router.get('/user/:id', async (req, res) => {
//     let collection = await db.collection('users');
//     let query = { _id: ObjectId(req.params.id) };
//     let result = await collection.findOne(query);

//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// })

// Login User
router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        res.json({
            name: req.user.name,
            email: req.user.email,
            books: req.user.books,
            words: req.user.words
        })
    }
})

// Add user
router.post('/signup', async (req, res) => {
    let collection = await db.collection('users')
    let user = { ...req.body, books: [], words: [] }
    user.date = new Date()
    user.password = hashPassword(user.password)
    let result = await collection.insertOne(user)
    if (result.acknowledged) {
        res.json({
            email: user.email,
            password: req.body.password
        })
    }
})

// Update user

// Delete user

module.exports = router
