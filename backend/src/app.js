const express = require('express')
const callToDB = require('./db/database')
const authRoutes = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const postRoutes = require('./routes/post.route')
const app = express()

app.use(express.json())
app.use(cookieParser())
callToDB()

app.use('/api/auth', authRoutes)
app.use('/api/auth/posts', postRoutes)
module.exports = app

