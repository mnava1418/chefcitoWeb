const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    img: {type: String, required: false, default: ''},
    isFaceBook: {type: Boolean, required: false, default: false},
    isGoogle: {type: Boolean, required: false, default: false},
})

UserSchema.plugin(uniqueValidator, {message: 'El {PATH} ya está registrado'})

module.exports = mongoose.model('user', UserSchema)
