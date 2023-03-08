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
    maxResults: 25,
    order: 'date',
    type: ['video'],
    publishedAfter: '2023-02-01T00:00:00Z',
    q: Constants.SEARCH_QUERY
  }

module.exports = {
    refreshDataHandler: function() {
        console.log('Refreshing videos data!');
        googleApi.search.list(queryParams).then(response => {
            const results = ResponseParser.parseResponse(JSON.parse(JSON.stringify(response.data)));
            const videoArrayOfValues = results.map(obj => [obj.videoId, obj.title, obj.description, obj.thumbnail, obj.channelId, obj.channelTitle,
                (obj.publishTime).replace('T',' ').replaceAll('Z','')]);
            DB.pushData(videoArrayOfValues);
        }).catch(error => {
            console.log("API error: ", error);
            if (error.message === Constants.QUOTA_EXCEEDED_ERROR_MSG && authKeys.length) {
                const newApiKey = authKeys.shift();
                googleApi = new Googleapis.youtube_v3.Youtube({
                    auth: newApiKey
                });
                console.log(`new API key: ${newApiKey}`);
            } else {
                console.error(error)
            }
        });
    }
}