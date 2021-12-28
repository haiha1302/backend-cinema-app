const express = require('express')
const passport = require('passport')

const router = express.Router()

const CLIENT_URL = 'http://localhost:3000/'

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