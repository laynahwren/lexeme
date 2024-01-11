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
                        { '$set': { words: [...result.words, req.body] } },
                        { returnDocument: 'after' })
                }

                // Need to handle duplicate case

                // } else {
                //     let index = result.words.findIndex(item => item.word === req.body.word)
                //     let newEntry = { ...result.words[index], meanings: [...result.words[index].meanings, ...req.body.meanings] }
                //     console.log(newEntry)
                //     finalResult = await collection.findOneAndUpdate(
                //         { "_id": new ObjectId(req.user) },
                //         { '$set': { words: result.words.toSpliced(index, 1, newEntry) } },
                //         { returnDocument: 'after' })
                // }
                
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