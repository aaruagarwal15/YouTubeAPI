module.exports =  {
    parseResponse: (data) => {
        const resultObject = []
        data.items.forEach(item => {
            resultObject.push({
                videoId: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                channelId: item.snippet.channelId,
                channelTitle: item.snippet.channelTitle,
                publishTime: item.snippet.publishTime
            })
        })
      return resultObject
    }
}
