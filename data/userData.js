const userModel = require('../models/userModel')
const UserModel = require('../models/userModel')

const getUserByEmail = async(email) => {
    const result = await UserModel.findOne({email})
    .then(userDB => {
        return {user: userDB}
    })
    .catch(error => {
        return {error}
    })

    return result
}

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
    createUser,
    getUserByEmail
}