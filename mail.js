const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();

const auth = {
  auth: {
    api_key: process.env.MAILGUN_PRIVATE_API_KEY,
    domain: process.env.MAILGUN_SANDBOX_DOMAIN
  }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text, cb) => {
  const mailOptions = {
    sender: name,
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: name + ' - ' + subject,
    text: text
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
}

module.exports = sendMail;