const express = require('express')
const passport = require('passport')
const { registerUser, login } = require('../controller/authController')

const router = express.Router()

const CLIENT_URL = process.env.ORIGIN_URL

router.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await registerUser(username, password)
        res.json(user)
    } catch (err) {
        res.status(401).send(err.message)
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await login(username, password)
        const token = createToken(user)
        res.json({
            user: {
                username: username
            },
            token: token
        })
    } catch (err) {
        res.status(401).send(err.message)
    }
})

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'failure'
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.ORIGIN_URL)
})

// Login with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))
//

// Login with Github
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}))

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))
//

// // Login with Discotd
// router.get('/discord', passport.authenticate('discord', {
//     scope: ['identify', 'email', 'guilds', 'guilds.join']
// }))

// router.get('/discord/callback', passport.authenticate('discord', {
//     failureRedirect: '/login/failed'
// }), (req, res) => {
//     res.redirect(CLIENT_URL)
// })
// //

module.exports = router