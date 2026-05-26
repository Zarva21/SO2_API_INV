const { createClient } = require('redis');

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD || undefined,
    socket: {
        host: process.env.REDIS_HOST || '192.168.100.16',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        family: 4,
        reconnectStrategy: (retries) => {
            if(retries > 10) return new Error('No se pudo conectar a Redis después de 10 intentos');
            return Math.min(retries * 100, 3000);
        }
    }
});

redisClient.on('error', (err) => console.error('Error en Redis Client:', err));

if(redisClient.isOpen) {
    redisClient.connect().catch(err => {
        console.error('Error al conectar a Redis:', err);
    });
}

module.exports = redisClient;