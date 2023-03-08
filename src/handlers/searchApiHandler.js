const redisClient = require('../config/redis');
const DBConnection = require('../config/database');

module.exports = {
    search: async (string) => {
        return new Promise((resolve, reject) => {
            console.log("Inside search handler with string: " + string);
            if(string == undefined || string == null) {
                console.log("Search string is null or undefined");
                resolve("Search string is null or undefined");
            } else {
                redisClient.get(string, async (error, response) => {
                    console.log(response);
                    if (error) reject(error);
                    else {
                        if(response != null) {
                            console.log("Printing response: ");
                            console.log(response);
                            resolve(response);
                        } else {
                            var dbResult = await DBConnection.searchData(string);
                            console.log(`mysql response for string: ${JSON.stringify(dbResult)}`);
                            
                            redisClient.set(string, JSON.stringify(dbResult), 'EX', 10).then(res => {
                                console.log(`Successfully set key: ${string} to Redis. Result: ${res}`)
                            }).catch(err => {
                                console.error(`Error setting key: ${string} to Redis. Error: ${err}`)
                            })
                            resolve('Data fetched successfully!' + JSON.stringify(dbResult));
                        }
                    }
                });
            }
        })
    }
}