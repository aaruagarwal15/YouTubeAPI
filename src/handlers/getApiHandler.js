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
                        console.log("GET Printing cached response: ");
                        console.log(response);
                        resolve(response);
                    } else {
                        var dbResult = await DBConnection.fetchData(jumpValue, Constants.ENTRY_PER_PAGE);
                        console.log(`GET mysql response for string: ${JSON.stringify(dbResult)}`);
                        
                        redisClient.set(redisKey, JSON.stringify(dbResult), 'EX', 300).then(res => {
                            console.log(`GET Successfully set key: ${redisKey} to Redis. Result: ${res}`);
                        }).catch(err => {
                            console.error(`GET Error setting key: ${redisKey} to Redis. Error: ${err}`);
                        })
                        resolve('GET Data fetched successfully!' + JSON.stringify(dbResult));
                    }
                }
            })
            return "GetAPI called for page: " + page;
        })
    }
}