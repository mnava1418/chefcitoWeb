const RecipeModel = require('../models/recipeModel')

const createRecipe = async(recipe) => {
    const recipeModel = new RecipeModel(recipe)
    const result = await recipeModel.save()
    .then(recipeDb => {
        return {recipe: recipeDb}
    })
    .catch(error =>{
        return {error}
    })

    return result
}

module.exports = {
    createRecipe
}