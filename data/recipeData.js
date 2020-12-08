const RecipeModel = require('../models/recipeModel')

const createRecipe = async(recipe) => {
    const recipeModel = new RecipeModel(recipe)
    const result = await recipeModel.save()
    .then(recipeDb => {
        recipeDb.image = undefined
        return {recipe: recipeDb}
    })
    .catch(error =>{
        return {error}
    })

    return result
}

const getRecipes = async(userId) => {
    const result = await RecipeModel.find({user: userId})
    .then(recipesDb => {
        return {recipes: recipesDb}
    })
    .catch(error => {
        return {error}
    })
    
    return result
}

module.exports = {
    createRecipe,
    getRecipes
}