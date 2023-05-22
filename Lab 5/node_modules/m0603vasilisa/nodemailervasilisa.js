const nodemailer =require("nodemailer");

module.exports.send = (from, pass, message) => {
    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: from,
                pass: pass
            }
        },
        {
            from: `Nodemailer Vasilisa <${from}>`,
        }
    )
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}