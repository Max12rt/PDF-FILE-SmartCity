const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {user: "tsyupams@gmail.com", pass: "axwe ksub fcat ulnm"}
})
const mailer = mailOptions => {
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error)
        else console.log("Send mail: ", info)
    })
}

module.exports = mailer
