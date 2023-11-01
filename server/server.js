const http = require('http')
const { PORT = 3000 } = process.env
const app = require('./app')

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`)
})