// import and invoke express to create your app
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const client = require('./db/client');
// connect to client
client.connect();

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));
const { requiresAuth } = require('express-openid-connect');

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cookie-parser
const cookieParser = require('cookie-parser');
const { COOKIE_SECRET} = require("./secrets");
app.use(cookieParser(COOKIE_SECRET));

// init cors
const cors = require('cors');
app.use(cors());

// base route that returns "hello world"
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// authorization
app.get('/test', requiresAuth(), (req, res, next) => {
    res.send('You are authorized')
})

// have to have to run, hun!
app.use(express.json());

// create router that adds the /api prefix to your routes
app.use('/api', require('./api'));

// listen to the port your server is running on
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})

