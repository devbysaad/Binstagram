const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { createPostController } = require('../controller/post.controller')

router.post('/', authMiddleware, createPostController)

module.exports = router