const Constants = require('../utils/constants'); 
const Googleapis = require('googleapis')
const ResponseParser = require('../utils/responseParser');
const DB = require('../config/database');

const authKeys = Constants.GOOGLE_API_KEY.split(' | ');

var googleApi = new Googleapis.youtube_v3.Youtube({
  auth: authKeys.shift() 
})

const queryParams = {
    part: ['snippet'],
    order: 'date',
    type: ['video'],
    maxResults: 25,
    publishedAfter: '2023-02-01T00:00:00Z',
    q: Constants.SEARCH_QUERY
}

module.exports = {
    
    // Function called after every 30 seconds to fetch data from youtube and push to DB
    refreshDataHandler: function() {
        
        googleApi.search.list(queryParams).then(response => {
            // Parsed google API response to Response Parser
            const results = ResponseParser.parseResponse(JSON.parse(JSON.stringify(response.data)));
            
            // Changing datetime format from 2023-03-04T12:12:000Z to 2023-03-04 12:12:000
            const videoArrayOfValues = results.map(obj => [obj.videoId, obj.title, obj.description, obj.thumbnail, obj.channelId, obj.channelTitle,
                (obj.publishTime).replace('T',' ').replaceAll('Z','')]);

            DB.pushData(videoArrayOfValues);
        }).catch(error => {
            // API Quota limit exceeded handling
            if (authKeys.length && error.message === Constants.QUOTA_EXCEEDED_ERROR_MSG) {
                const newApiKey = authKeys.shift();
                googleApi = new Googleapis.youtube_v3.Youtube({
                    auth: newApiKey
                });
                console.log(`new API key: ${newApiKey}`);
            } else {
                console.error(error);
            }
        });
    }
}