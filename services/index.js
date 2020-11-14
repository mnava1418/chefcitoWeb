const nodeMailer = require('nodemailer')
const appAuth = require('../config/appAuth')

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

module.exports = {
    generateRespone,
    sendEmail,
}