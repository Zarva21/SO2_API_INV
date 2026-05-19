const { createClient } = require('redis');

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.connect().catch(err => {
    console.error('Error al conectar a Redis:', err);
});

module.exports = redisClient;