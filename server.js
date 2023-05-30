const http = require('http');
const app = require('./src/app.js')

const server = http.createServer(app)

server.listen(3000, _ => console.log("rodando na porta 3000"))