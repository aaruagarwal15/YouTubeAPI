# FamPay - YouTube Trending API

## Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Basic Requirements:

- Server should call the YouTube API continuously in background (async) with some interval (say 10 seconds) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database with proper indexes.
- A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
- A basic search API to search the stored videos using their title and description.
- Dockerize the project.
- It should be scalable and optimised.

# Running locally
#### NOTE: Multiple Google API keys can be specified to avoid quota exceed errors. To do this, specify them as a single string, separated using ` | ` (space-pipe-space) in constant.js file. Example:
`GOOGLE_API_KEY = 'KEY1 | KEY2 | KEY3 | KEY4'`
### Using Docker
Use `docker-compose` to test the app locally. Make sure to make relevant changes to the environment variables in `docker-compose.yml` file. Use the following command to build and start the app:
```bash
docker-compose up --build
```

## API endpoints
#### 1. `/get`
```
URL: /get/:page
Request type: GET
Data parameters: page
```

#### 2. `/search`
```
URL: /set/:string
Request type: GET
Data parameters: string