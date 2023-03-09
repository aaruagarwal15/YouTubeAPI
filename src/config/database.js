const mysql = require('mysql');

// MySQL Connection Config
var DBConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

DBConnection.connect(function(err) {
	if (err) throw err;
    console.log("DB Connected!");
});

module.exports = {
    // Function to push data to DB after fetching after every 20 sec
    pushData: function(videos) {
        // Adding IGNORE in insert will ensure that any entry of existing videoId will be ignored
        let query = `INSERT IGNORE INTO video(videoId, title, description, thumbnail, channelId, channelTitle, publishTime) VALUES ? `;
        DBConnection.query(query, [videos], function (err, result) {
            if (err) throw err;
        }); 
    },
    // Function to search data in DB based on title and description
    searchData: async function(searchString) {
        return new Promise((resolve, reject) => {
            const searchRegexp = searchString.split(' ').join('|');
            var query = `SELECT * FROM video WHERE title REGEXP "${searchRegexp}" OR description REGEXP "${searchRegexp}" ORDER BY publishTime DESC LIMIT 20;`;
            DBConnection.query(query, function(err, result){
                if (err) reject(err);
                resolve(result);
            }); 
        });
    },
    // Function to fetch data from DB
    fetchData: async function(offset, limit) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM video ORDER BY publishTime DESC LIMIT ${limit} OFFSET ${offset} ;`;
            DBConnection.query(query, function(err, result){
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

