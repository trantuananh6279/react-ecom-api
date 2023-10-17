const sendMail = require('./sendEmail');

const sendVerificationEmail = async ({
    name,
    email,
    verificationToken,
    origin,
}) => {
    const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;
    const message = `<p>Please click the link to confirm your account: <a href="${verifyEmail}">Verify email</a> </p>`;
    return sendMail({
        to: email,
        subject: `Email verification`,
        html: `Hello! ${name} 
        ${message}`,
    });
};

module.exports = sendVerificationEmail;
