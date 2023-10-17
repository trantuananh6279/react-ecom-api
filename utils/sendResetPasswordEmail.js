const sendMail = require('./sendEmail');

const sendResetPasswordEmail = async ({
    name,
    email,
    passwordToken,
    origin,
}) => {
    const resetPasswordEmail = `${origin}/reset-password?token=${passwordToken}&email=${email}`;
    const message = `<p>Please click the link to reset your password: <a href="${resetPasswordEmail}">Reset password</a> </p>`;
    return sendMail({
        to: email,
        subject: `Reset password`,
        html: `Hello! ${name} 
        ${message}`,
    });
};

module.exports = sendResetPasswordEmail;
