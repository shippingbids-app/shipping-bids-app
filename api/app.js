require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

require("./config/db.config");
require("./config/cron.config")

const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
  next();
})

app.use(express.static(`${__dirname}/react-app`))

app.use(express.json());
app.use(logger("dev"));

const { session, loadUser } = require("./config/session.config");
app.use(session);
app.use(loadUser);

app.use((req, res, next) => {
  res.locals.googleApiKey = process.env.GOOGLE_API_KEY,
  res.locals.query = req.query
  next()
})

const routes = require("./config/routes.config");
app.use("/api/v1", routes);

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/react-app/index.html`)
})

app.use((error, req, res, next) => {
  const data = {};

  console.error(error);

  if (error instanceof mongoose.Error.ValidationError || error.status === 400) {
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  }

  data.message = error.message;

  res.status(error.status || 500);
  res.send(data);
});

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Shipping-Bids API running at port ${port}`)
);

module.exports = app;
