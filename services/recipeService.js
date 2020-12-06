const recipeData = require('../data/recipeData')
const services = require('./index')

const getRecipes = async(userId) => {
    const result = await recipeData.getRecipes(userId)
    if(result.error) {
        return services.generateRespone(500, result)
    } else {
        return services.generateRespone(200, result)
    }
}

const createRecipe = async(recipe) => {
    let ingredients = recipe.ingredients.split('|')
    ingredients = ingredients.filter(value => { return value != ""})
    recipe.ingredients = ingredients
    const result = await recipeData.createRecipe(recipe)

    if(result.error) {
        return services.generateRespone(500, result)
    } else {
        return services.generateRespone(200, result)
    }
}

module.exports = {
    createRecipe,
    getRecipes
}