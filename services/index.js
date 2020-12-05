const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const appAuth = require('../config/appAuth')
const { jwtToken } = require('../config/appAuth')

const generateRespone = (status, json ) => {
    const response = {status, json}
    return response
}

const sendEmail = async(subject, to, message) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: appAuth.mail.user,
            pass: appAuth.mail.token,
        }
    })

    const mailOptions = {
        from: `Chefcito <${appAuth.mail.user}>`,
        to: to,
        subject: subject,
        html: message,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
}

const validateToken = async(req, res, next) => {
    const token = req.get('token')
    
    jwt.verify(token, jwtToken, (err, payload) => {
        if(err) {
            res.status(401).json({error: 'Usuario no autorizado'})
        } else {
            req.user = payload.user
            next()
        }
    })
}

module.exports = {
    generateRespone,
    sendEmail,
    validateToken
}