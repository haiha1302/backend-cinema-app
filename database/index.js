const { MongoClient } = require('mongodb')
require('dotenv').config();

const url = process.env.DATABASE_URL

const client = new MongoClient(url)

const db = {}

const connectToMongo = async () => {
    await client.connect()
    console.log('DB connected!!!');

    const database = client.db('UsersMovies')
    db.users = database.collection('usersAccount')
}

module.exports = { connectToMongo, db }

