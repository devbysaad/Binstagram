const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')

async function authMiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = await userModel.findById({
            _id: decoded.id
        })
        req.user = userId
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = authMiddleware