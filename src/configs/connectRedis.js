const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })

async function connectRedis() {
    await redisClient.connect();
}

module.exports = {
    connectRedis,
    redisClient
}