const UserModel = require('../models/userModel')

const createUser = async(user) => {
    const userModel = new UserModel(user)
    const result = await userModel.save()
    .then(userDb => {
        userDb.password = undefined
        return {user: userDb}
    })
    .catch(error => {
        return {error}
    })

    return result
}

module.exports = {
    createUser
}