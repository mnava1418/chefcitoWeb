const generateRespone = (status, json ) => {
    const response = {status, json}
    return response
}

module.exports = {
    generateRespone
}