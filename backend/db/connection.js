const mongoose = require('mongoose');

const connectString = 'mongodb://mongo:27017/theRush';

mongoose.connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => {
        console.log('Connection Error: ', e.message)
})

mongoose.connection.once('open', () => {
    console.log("MongoDB is now connected")
}).on('error', () => {
    console.log("Cannot connect MongoDB :(")
})

const db = mongoose.connection

module.exports = db