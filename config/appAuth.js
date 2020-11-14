const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoDB: {
        development: {
            url: process.env.MONGO_DEV
        }
    }
}