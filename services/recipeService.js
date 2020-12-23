const recipeData = require('../data/recipeData')
const services = require('./index')
const fs = require('fs')

const getRecipes = async(userId) => {
    const result = await recipeData.getRecipes(userId)
    let recipesByCategory = {}
    if(result.error) {
        return services.generateRespone(500, result)
    } else {
        const recipes = result.recipes
        recipes.forEach(element => {
            const fileName = `${element.user}|${element._id}.jpeg`
            const category = element.category

            fs.writeFileSync(`public/recipes/${fileName}`, element.image)
            element.image = undefined
            element.fileName = fileName
            
            if(recipesByCategory[category] == undefined) {
                recipesByCategory[category] = []
            }

            recipesByCategory[category].push(element)
        });

        return services.generateRespone(200, {recipes: recipesByCategory})
    }
}

const removeRecipeImage = (fileName) => {
    try {
        fs.unlinkSync(`public/recipes/${fileName}`)
    } catch (error) {}
    
    return services.generateRespone(200, {ok: true})
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

const deleteRecipe = async(recipeId, userId) => {
    let result = await recipeData.deleteRecipe(recipeId, userId)

    if(result.error) {
        return services.generateRespone(500, result)
    } else {
        return services.generateRespone(200, result)
    }
}

module.exports = {
    createRecipe,
    getRecipes,
    removeRecipeImage,
    deleteRecipe
}