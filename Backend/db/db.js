const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
}

module.exports = connectToDb;