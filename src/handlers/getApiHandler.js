const redisClient = require('../config/redis');
const DBConnection = require('../config/database');
const Constants = require('../utils/constants');

module.exports = {
    getPage: async function(page) {
        return new Promise((resolve, reject) => {
            var jumpValue = 0;
            if (page !== undefined) {
                if (isNaN(page)) {
                    resolve('Only integers allowed for page numbers!');
                }
                jumpValue = (page - 1) * Constants.ENTRY_PER_PAGE;
            }    
            const redisKey = `get_${page}`;

            redisClient.get(redisKey, async (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    if (response !== null) {
                        resolve('Data fetched successfully from Redis! ' + response);
                    } else {
                        var dbResult = await DBConnection.fetchData(jumpValue, Constants.ENTRY_PER_PAGE);
                        
                        redisClient.set(redisKey, JSON.stringify(dbResult), 'EX', Constants.REDIS_TTL).then(res => {
                            console.log(`GET Successfully set key: ${redisKey} to Redis. Result: ${res}`);
                        }).catch(err => {
                            console.error(`GET Error setting key: ${redisKey} to Redis. Error: ${err}`);
                        })
                        resolve('Data fetched successfully from DB! ' + JSON.stringify(dbResult));
                    }
                }
            })
            return "GetAPI called for page: " + page;
        })
    }
}