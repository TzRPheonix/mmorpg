const nodemailer = require('nodemailer');

async function sendEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mathispalincourt@gmail.com',
      pass: 'Scoubidou95' 
    }
  });

  const mailOptions = {
    from: 'mathispalincourt@gmail.com',
    to: to,
    subject: subject,
    html: body
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };