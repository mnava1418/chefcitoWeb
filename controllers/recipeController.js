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

module.exports = {
    createRecipe
}