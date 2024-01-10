const express = require('express')
const db = require('../db/connect')
const { ObjectId } = require('mongodb')

const router = express.Router()

// Update user library
router.put('/library', async (req, res) => {
    try {
        let collection = await db.collection('users')
        let result = await collection.findOneAndUpdate(
            { "_id": new ObjectId(req.user) },
            { $addToSet: { books: req.body.isbn } },
            { returnDocument: 'after' })
        if (result) {
            res.send(result)
        }
    } catch (err) {
        res.send(err)
    }
})

//Update current read
router.put('/currentRead', async (req, res) => {
    try {
        let collection = await db.collection('users')
        let result = await collection.findOneAndUpdate(
            { "_id": new ObjectId(req.user) },
            { $set: { currentRead: req.body.isbn } },
            { returnDocument: 'after' })
        if (result) {
            res.send(result)
        }
    } catch (err) {
        res.send(err)
    }
})

// Update user lexicon
router.put('/lexicon', (req, res) => {

})

module.exports = router