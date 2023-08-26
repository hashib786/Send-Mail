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

const sendMail = async (email : string, subject : string, html : string) =>{
    const info = await transporter.sendMail({
        from: `Hashib Raja <${process.env.EMAIL_FROM}>`, // sender address
        to: email, // list of receivers
        subject, // Subject line
        html, // html body
      });
}

export default sendMail;