require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const app = require('express')();

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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tweet', async (req, res) => {
    try {
        const d = await xClinet.v2.tweet("Hi dear, I am here to post about programming");
        res.send(d);
    } catch (error) {
        res.send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});