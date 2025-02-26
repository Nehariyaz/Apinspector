const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure environment variables are loaded

const transporter = nodemailer.createTransport({
    service: "Gmail", // Change if using another provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;


