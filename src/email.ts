import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service : process.env.EMAIL_SERVICES,
    port: 587,
    secure: true,
    auth: {
      user: process.env.GEMAIL_USERNAME,
      pass: process.env.GEMAIL_PASSWORD,
    },
  });