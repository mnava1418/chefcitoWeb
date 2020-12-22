const recipeService = require('../services/recipeService')

const createRecipe = async(req, res) => {
    let recipe = req.body
    recipe.user = req.user._id

    if(req.files) {
        const image = req.files.image
        recipe.image = image.data
    }

    const result = await recipeService.createRecipe(recipe)
    res.status(result.status).json(result.json)
}

const getRecipes = async(req, res) => {
    const userId = req.user._id
    const result = await recipeService.getRecipes(userId)
    res.status(result.status).json(result.json)
}

const removeRecipeImage = async(req, res) => {
    const fileName = req.params.fileName
    const result = recipeService.removeRecipeImage(fileName)
    res.status(result.status).json(result.json)
}

module.exports = {
    createRecipe,
    getRecipes,
    removeRecipeImage
}