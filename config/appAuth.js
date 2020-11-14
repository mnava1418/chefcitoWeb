const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoDB: {
        development: {
            url: process.env.MONGO_DEV
        }
    },
    jwtToken: process.env.JWT_SEED,
    mail: {
        user: process.env.MAIL_FROM,
        token: process.env.MAIL_TOKEN
    }
}