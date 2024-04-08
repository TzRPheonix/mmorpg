const nodemailer = require('nodemailer');

async function sendEmail(to, subject, body) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const mailOptions = {
    from: testAccount.user,
    to: to,
    subject: subject,
    html: body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendEmail };