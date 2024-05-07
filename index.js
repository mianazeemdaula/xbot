require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const app = require('express')();
const { CronJob } = require('cron');

const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

async function postTweet() {
    try {
        const answer = await groq.chat.completions.create({
            model: 'gemma-7b-it',
            messages: [
                { role: 'user', content: 'write a quote on never give up' },
            ]
        });
        const message = answer.choices[0].message.content;
        const d = await twitterClient.v2.tweet(message);
        return d;
    } catch (error) {
        console.error(error);
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tweet', async (req, res) => {
    try {
        const d = await postTweet();
        res.send(d);
    } catch (error) {
        res.send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const cronTweet = new CronJob("30 * * * * *", async () => {
    postTweet();
});

cronTweet.start();