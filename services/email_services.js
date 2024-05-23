const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport
    ({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

class EmailService {



    static async sendEmail(email, otp, subject) {
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            text: `Your OTP is ${otp}`
        };
        console.log(mailOptions);
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(info);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

exports.emailService = EmailService;
