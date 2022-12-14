const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        if (mongoose.connection) {
            console.log('Mongoose is connecting at port 27017...');
        }
    } catch (error) {
        console.log('Connect failed!!!');
    }
}

module.exports = { connect };
