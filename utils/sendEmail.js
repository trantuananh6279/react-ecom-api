const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
    nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport(nodemailerConfig);
    await transporter.sendMail({
        from: '"tuan anh 👻" <trantuananh6279@gmail.com>',
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
