const postModel = require('../models/post.models')
const genrateCaption = require('../services/ai.service')
const uploadFile = require('../services/storage.server')
const { v4: uuidv4 } = require('uuid')

async function createPostController(req, res) {
    const file = req.file

    const base64image = Buffer.from(file.buffer).toString('base64')

    const caption = await genrateCaption(base64image)
    const result = await uploadFile(file.buffer, `${uuidv4()}`)

   
    const post = await postModel.create({
        caption:caption,
        image:result.url,
        userId: req.user._id
    })
    res.status(201).json({
        message:"Post created Successfully",
        post
    })


}

module.exports = { createPostController }