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

// Check user
router.get('/logged-in', (req, res) => {
    if (req.user) {
        res.send(true)
    } else {
        res.send(false)
    }
})

// Login User
router.post('/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json({
                        name: user.name,
                        email: user.email,
                        books: user.books,
                        words: user.words,
                        currentRead: user.currentRead
                    })
                }
            })
        } else if (err) {
            res.send(err)
        } else {
            res.send(info)
        }
    })(req, res)
})

// Add user
router.post('/signup', async (req, res) => {
    try {
        let collection = await db.collection('users')
        let user = { ...req.body, books: [], words: [], currentRead: null }
        let result = await collection.findOne({ email: user.email })
        if (result) {
            res.json({
                message: 'Existing user'
            })
        } else {
            user.date = new Date()
            user.password = hashPassword(user.password)
            result = await collection.insertOne(user)
            if (result.acknowledged) {
                res.json({
                    email: user.email,
                    password: req.body.password
                })
            }
        }
    } catch (err) {
        res.send(err)
    }
})

// Logout user
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            res.send(err)
        } else {
            res.send(true)
        }
    })
})

// Update user

// Delete user

module.exports = router
