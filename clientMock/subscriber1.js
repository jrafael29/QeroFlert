console.log('subscriber1 sstarted');

const redisClient = require('../src/config/redis.config');


redisClient.subscribe('sala1', (message, channel) => {
    console.log('message sub1', message, 'channel', channel);
})



redisClient.subscribe('sala2', (message, channel) => {
    console.log('message sub2', message, 'channel', channel);
})