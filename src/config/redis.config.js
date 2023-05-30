const {createClient} = require('redis')

const client = createClient({
    url: `redis://${process.env.REDIS_URL || '172.20.0.2'}:6379`
})
client.on('error', (error) => console.log('deu ruim no redis ', error))
client.connect()

module.exports = client;