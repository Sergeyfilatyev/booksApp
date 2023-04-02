const nodemailer = require("nodemailer");

async function sendEmail({ userName, userEmail, userMessage }) {
  const letter = `<h1 style="color: green; text-decoration: underline;">Вы получили письмо от ${userName}</h1>
    <p>Контактный мейл: ${userEmail}</p>
    <p>Вам пришло сообщение: ${userMessage}</p>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "anastassia_goit_eu@meta.ua", // generated ethereal user
      pass: "1History_goit", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'anastassia_goit_eu@meta.ua', // sender address
    to: "anastassia.vomm@gmail.com", // list of receivers
    subject:
      "April 4, Tallinn. First Intergalactic Jedi Conference. Palace of water sports 19:00.", // Subject line
    text: userMessage, // plain text body
    html: letter, // html body
  });

  /* USER_MAIL=testserver@mailfence.com
PASS_MAIL=Zxcvbnm1//0
HOST_MAIL=smtp.mailfence.com
PORT_MAIL=465 */

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;
