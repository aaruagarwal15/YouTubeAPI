// File to store all the constants
var Constants = {
    GOOGLE_API_KEY: '',
    SEARCH_QUERY: 'code',
    REFRESH_INTERVAL: 30,   // 30 sec
    ENTRY_PER_PAGE: 20,    
    REDIS_TTL: 120,         // 2 mins
    QUOTA_EXCEEDED_ERROR_MSG: 'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.'
}

module.exports = Constants; 
