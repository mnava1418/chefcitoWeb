const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    ingredients: {type: Array, required: true},
    count: {type: Number, required: true},
    instructions: {type: String, required: true},
    image: {type: Buffer},
    fileName: {type: String, required: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
})

module.exports = mongoose.model('recipe', RecipeSchema)
