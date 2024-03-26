const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Influx" <${process.env.EMAIL_USERNAME}>`,
    to: to,
    subject: subject,
    html: html,
  });
};

module.exports = { sendEmail };
