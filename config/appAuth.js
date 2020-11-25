const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoDB: {
        development: {
            url: process.env.MONGO_DEV
        }
    },
    mail: {
        user: process.env.MAIL_FROM,
        token: process.env.MAIL_TOKEN
    },
    jwtToken: process.env.JWT_SEED,
    googleClientId: process.env.GOOGLE_CLIENT_ID
}