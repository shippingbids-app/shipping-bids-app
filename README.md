# shipping-bids-app

<b>This project it's made to connect people who has a transport offer with transporters and through bids they get a good price for both.</b><br/>
- Once a user it's registered on the app, he can create a service to carrier packages and/or create an ship offer.<br/>
- Every ship offer has a `Bid` section and a `Comments` section to interact between offertant an transporter.<br/>
- Has a bottom navbar to see the map screen and the offers screen.<br/>
- We implement a `Guest` button to make easier to view the app. 

## If you want to see more.

To see the app you only need to click <a href="https://shipping-bids.herokuapp.com/" target="_blank"><b>here</b></a>.

## Used stack:
To make this project we used:

## Front-end:

### `React`

All front of shipping bids app was created in React, using:
<ul>
    <li><b>React router dom:</b> To create all routes in the APP.</li>
    <li><b>Contexts:</b> to manage user status around the app and some alerts.</li>
    <li><b>useState:</b> to control the state of all the components that need it.</li>
    <li><b>useEffect:</b> to manage what each component does when it is assembled.</li>
</ul>

### `Axios`

We use Axios to manage all routes to the API.

### `MUI`

With MUI we did:
<ul>
    <li><b>The Navbar.</b></li>
    <li><b>The Bottom Navbar.</b></li>
    <li><b>The alert.</b></li>
</ul>

### `Bootstrap`

We used Bootstrap to:
<ul>
    <li><b>Cards and collapses.</b></li>
    <li><b>Responsive display.</b></li>
    <li><b>Colours, buttons...</b></li>
</ul>

### `MUI Icons`
Both Navbars.

## Back-end:

### `Node.Js`

Back-end it's a REST API and was made in Node using Express.Js and libraries/frameworks like:
<ul>
    <li><b>Bcryptjs:</b> to hash the users password.</li>
    <li><b>Cloudinary:</b> to manage the users profile image.</li>
    <li><b>Express Session:</b> to create session cookies.</li>
    <li><b>Http Errors:</b> to manage use errors.</li>
    <li><b>Mongoose:</b> to connect with Mongo DB.</li>
    <li><b>Node Cron:</b> to manage times.</li>
    <li><b>Nodemailer:</b> to create a welcome mail.</li>
</ul>

We also use `Faker` to fill our first DB

### `Postman`

All routes are protected, you only can see if you are authenticated, you can use `guest@example.com` as email and `12345678` as password to check it.<br/>
API starts at `https://shipping-bids.herokuapp.com/api/v1` and the most significative are:
<ul>
    <li><b>POST /register:</b> to create a new user.</li>
    <li><b>POST /authenticate:</b> to login with a existing user.</li>
    <li><b>POST /offers/create:</b> to create a new offer.</li>
    <li><b>GET /offers:</b> to get all offers.</li>
    <li><b>GET /offers/:offerId:</b> to get a detail of an offer.</li>
    <li><b>POST /offers/:offerId/comments:</b> to create a comment on a offer.</li>
    <li><b>POST /offers/:offerId/bids:</b> to create a bid on a offer.</li>
</ul>

### `Middlewares`

We created some security middlewares to protect routes

## Deploy:

This app was deployed in `Heroku` using `Docker`containers.
