const transporter = require("../config/mail.config");

module.exports.sendWelcome = (user) => {
  transporter
    .sendMail({
      from: "shipping-bids-app<shippingbids@gmail.com>",
      to: `${user.email}`,
      subject: `Welcome ${user.username}`,
      html: `<h1>Welcome to Shipping Bids</h1>
      <br>
      <p>Dear ${user.username}, Shipping Bids Team says hi! <br>
      Shipping Bids it's a new form to ship contacts. <br>
      <br/>
      From now you are a registered user and you can: <br/>
      <br>
      <ul>
        <li>Create ship offers.</li>
        <li>Offer your services as a Rider.</li>
        <li>Bid on offer you want to ship.</li>
      </ul>
      <br>
      <br>
      Thank you for you registration. <br/>
      You can talk with Shipping Bids team sending an email to shippingbids@gmail.com</p>
      <br>
      <h3>May the force bid with you.<h3/>
      `,
    })
    .then(() => console.log("Email sent"))
    .catch((error) => console.log("Error sending mail", error));
};
