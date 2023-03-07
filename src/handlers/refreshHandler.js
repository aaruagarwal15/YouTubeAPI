const Constants = require('../utils/constants'); 
const Googleapis = require('googleapis')
const ResponseParser = require('../utils/responseParser');

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
            console.log("API response: ", response.data.items);
            const results = ResponseParser.parseResponse(JSON.parse(JSON.stringify(response.data)));
        }).catch(error => {
            console.log("API error: ", error);
        });
    }
}
