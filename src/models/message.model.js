const { mongo } = require('mongoose')
const mongoose = require('../config/mongoose.config')

const messageSchema = mongoose.Schema({
    userId: String,
    message: String,
    createdAt: Date,
})

module.exports = mongoose.model('Messages', messageSchema, 'messages')
