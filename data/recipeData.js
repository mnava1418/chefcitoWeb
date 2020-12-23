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

const deleteRecipe = async(recipeId, userId) => {
    const result = await RecipeModel.findOneAndDelete({_id:recipeId, user: userId})
    .then( res => {
        return {ok: true}
    })
    .catch( error => {
        return {error}
    })
    return result
}

const getRecipes = async(userId) => {
    const result = await RecipeModel.find({user: userId}).sort({updatedAt: -1})
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
    getRecipes,
    deleteRecipe
}