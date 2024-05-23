const { token } = require("morgan");
const nodemailer = require("nodemailer");

class EmailService 
{

    static async sendEmail(email, subject, message) 
    {
        try 
        {
            const  transporter = nodemailer.createTransport({
                service: 'gmail',
                 token: process.env.EMAIL_PASSWORD,
            });

            const  mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                text: message
            };


            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            return false;
        }
    }
}