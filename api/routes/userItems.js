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
router.put('/lexicon', async (req, res) => {
    try {
        let collection = await db.collection('users')
        let finalResult
        await collection.findOne({ "_id": new ObjectId(req.user) })
            .then(async (result) => {
                if (result.words.find(item => item.word === req.body.word) === undefined) {
                    finalResult = await collection.findOneAndUpdate(
                        { "_id": new ObjectId(req.user) },
                        { $set: { words: [...result.words, req.body] } },
                        { returnDocument: 'after' })
                }
                else if (!req.body.meanings.length) {
                    finalResult = await collection.findOneAndUpdate(
                        { "_id": new ObjectId(req.user) },
                        { $pull: { words: { word: req.body.word } } },
                        { returnDocument: 'after' })
                }
                else {
                    finalResult = await collection.findOneAndUpdate(
                        { "_id": new ObjectId(req.user) },
                        { $set: { 'words.$[el]': req.body } },
                        { returnDocument: 'after', arrayFilters: [{ 'el.word': req.body.word }] })
                }

                if (finalResult) {
                    res.send(finalResult)
                }
            }
            )
    } catch (err) {
        res.send(err)
    }
})

module.exports = router