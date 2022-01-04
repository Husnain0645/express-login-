const nodemailer = require('nodemailer');

const sendEmail =  async option => {
//Create Transporter 
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
              }
    });

// create mailoptions
const mailoptions= {
    from : 'husnain Ume <Emailcomingfromapp.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
};

await transporter.sendMail(mailoptions);
}

module.exports = sendEmail;