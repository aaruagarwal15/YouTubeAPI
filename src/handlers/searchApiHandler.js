const redisClient = require('../config/redis');
const DBConnection = require('../config/database');
const Constants = require('../utils/constants');

module.exports = {
    // Function called for Search API
    search: async (string) => {
        return new Promise((resolve, reject) => {
            if(string == undefined || string == null) {
                resolve("Search string is null or undefined");
            } else {
                redisClient.get(string, async (error, response) => {
                    if (error) reject(error);
                    else {
                        if(response != null) {
                            resolve('Data fetched successfully from Redis! ' + response);
                        } else {
                            var dbResult = await DBConnection.searchData(string);
                            
                            // Setting (string, dbResult) in redis
                            redisClient.set(string, JSON.stringify(dbResult), 'EX', Constants.REDIS_TTL).then(res => {
                                console.log(`Successfully set key: ${string} to Redis. Result: ${res}`)
                            }).catch(err => {
                                console.error(`Error setting key: ${string} to Redis. Error: ${err}`)
                            })
                            resolve('Data fetched successfully from DB! ' + JSON.stringify(dbResult));
                        }
                    }
                });
            }
        })
    }
}