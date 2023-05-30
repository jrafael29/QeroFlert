const mongoose = require('../config/mongoose.config')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: Date,
})

module.exports = mongoose.model('User', userSchema, 'user');