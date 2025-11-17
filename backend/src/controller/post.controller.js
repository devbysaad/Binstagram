const postModel = require('../models/post.models')
const genrateCaption = require('../services/ai.service')

async function createPostController(req, res) {
    const file = req.file

    const base64image = Buffer.from(file.buffer).toString('base64')

    const caption = await genrateCaption(base64image)
    console.log(caption);

res.json({
    caption
})


}

module.exports = { createPostController }