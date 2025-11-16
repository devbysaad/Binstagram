
const userModel = require('../models/user.models')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    const { username, password } = req.body
    const existingUser = await userModel.findOne({ username })
    if (existingUser) {
        return res.status(400).json({
            message: "This username is already taken"
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie('token', token)
    res.status(201).json({
        message: "user created successfully",
        user
    })
}

async function loginController(req, res) {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
    if (!user) {
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }
    const isPasswordCorrect = bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie('token', token)
    res.status(200).json({
        message: "Login successful",
        user
    })
}

module.exports = {
    registerController,
    loginController
}