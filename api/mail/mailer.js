const transporter = require("../config/mail.config");

module.exports.sendWelcome = (user) => {
  transporter
    .sendMail({
      from: "shipping-bids-app<tvtrackerweb@gmail.com>",
      to: `${user.email}`,
      subject: `Welcome ${user.username}`,
      html: `<h3>Hola, bienvenido.</h3>
      <br>
      <p>Hola, bienvenido. De nuevo</p>
      <span>Estamos probando</span>`,
    })
    .then(() => console.log("Email sent"))
    .catch((error) => console.log("Error sending mail", error));
};
