const mongoose = require('mongoose')
const appAuth = require('../config/appAuth')

module.exports = () => {
    const env = process.env.NODE_ENV
    mongoose.connect(appAuth.mongoDB[env].url, {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Connected to Mongo!!')
        }
    })
}
