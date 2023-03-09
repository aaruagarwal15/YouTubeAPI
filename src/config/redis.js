const redis = require('ioredis');
const constants = require('../utils/constants');

const redisClient = new redis(process.env.REDIS_PORT, process.env.REDIS_HOST, { enableAutoPipelining: true });

redisClient.on('connect', () => {
  console.log('Redis connection established');
})

redisClient.on('error', (error) => {
  console.log(`Redis connection couldn't be established. Error: ${JSON.stringify(error)}`);
})

module.exports = redisClient;