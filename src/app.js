const express = require('express')
const app = express()
app.use(require('cors')());
app.use(express.json())
app.use(routes);
module.exports = app