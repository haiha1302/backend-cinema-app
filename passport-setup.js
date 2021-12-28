const GoogleStratery = require('passport-google-oauth20').Strategy
const GithubStratery = require('passport-github2').Strategy
// const DiscordStratery = require('passport-discord').Strategy
const passport = require('passport')

require('dotenv').config()

// lOGIN WITH GOOGLE ACCOUNT
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GoogleStratery({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile)
    })
)
//

// LOGIN WITH GITHUB ACCOUNT
passport.use(
    new GithubStratery({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile)
    })
)

// passport.use(
//     new DiscordStratery({
//         clientID: process.env.DISCORD_CLIENT_ID,
//         clientSecret: process.env.DISCORD_CLIENT_SECRET,
//         callbackURL: '/auth/discord/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile);
//         return done(null, profile)
//     })
// )