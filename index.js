require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const xClinet = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});
async function postTweet() {
    try {
        const d = await xClinet.v2.tweet("Hi dear, I am here to post about programming");
        console.log(d);
    } catch (error) {
        console.error(error);
    }
}
postTweet();