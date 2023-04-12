const { MongoClient } = require('mongodb')
require('dotenv').config()

const url = process.env.ATLAS_URL || ''
const client = new MongoClient(url)

const dbName = process.env.DB_NAME || ''

// let conn
// async function run() {
//   try {
//     conn = await client.connect()
//     let db = conn.db(dbName)
//     console.log(db)
//     return db
//   } catch (e) {
//     console.error(e)
//   }
// }

const db = client.db(dbName)

module.exports = db