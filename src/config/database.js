const mysql = require('mysql');

var DBConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "fampay"
});

DBConnection.connect(function(err) {
	if (err) throw err;
    console.log("DB Connected!");
});

module.exports = {
    pushData: function(videos) {
        let query = `INSERT INTO video(videoId, title, description, thumbnail, channelId, channelTitle, publishTime) VALUES ? `;
        DBConnection.query(query, [videos], function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        }); 
    },
    searchData: async function(searchString) {
        return new Promise((resolve, reject) => {
            console.log("SearchString: " + searchString);
            const searchRegexp = searchString.split(' ').join('|');
            console.log("RegEx: " + searchRegexp);
            var query = `SELECT * FROM video WHERE title REGEXP "${searchRegexp}" OR description REGEXP "${searchRegexp}" ORDER BY publishTime DESC LIMIT 20;`;
            DBConnection.query(query, function(err, result){
                if (err) reject(err);
                console.log("Search Result Complete: " , result);
                resolve(result);
            }); 
        });
    },
    fetchData: async function(offset, limit) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM video ORDER BY publishTime DESC LIMIT ${limit} OFFSET ${offset} ;`;
            DBConnection.query(query, function(err, result){
                if (err) reject(err);
                console.log("Search Result Complete: " , result);
                resolve(result);
            });
        });
    }
}

