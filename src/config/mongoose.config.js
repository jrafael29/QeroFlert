const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGO_URL}:27017/mydb`)

module.exports = mongoose