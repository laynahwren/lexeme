const express = require('express')
const db = require('../db/connect')

const router = express()

// Get user
// router.get('/user/:id', async (req, res) => {
//     let collection = await db.collection('users');
//     let query = { _id: ObjectId(req.params.id) };
//     let result = await collection.findOne(query);

//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// })

// Add user
router.post('/signup', async (req, res) => {
    let collection = await db.collection('users')
    let newDocument = req.body
    newDocument.date = new Date()
    let result = await collection.insertOne(newDocument)
    res.send(result).status(204)
})

// Update user

// Delete user

module.exports = router
