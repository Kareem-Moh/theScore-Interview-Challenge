const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const db = require('./db/connection');

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //Ignore SSL warnings. For development.

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, "Error connecting to MongoDB"))

app.use('/', indexRouter);

app.listen(80, () => {
    console.log('CORS-enabled web server is listening')
})

module.exports = app