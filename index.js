const express = require('express')
const { connectToMongo } = require('./database')
const cookieSession = require('cookie-session')
const cors = require('cors')
const passport = require('passport')
const authRoute = require('./router/auth')
require('./passport-setup')

require('dotenv').config()

const app = express()

const ORIGIN_URL = process.env.ORIGIN_URL
console.log(ORIGIN_URL);
app.use(cookieSession({
    name: 'session',
    keys: ['SECRET_COOKIE_KEY'],
    maxAge: 24 * 60 * 60 * 100
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}))

app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.json('Welcome')
})

connectToMongo()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})