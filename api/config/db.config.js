require("dotenv").config()
const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shipping-bids-app"

mongoose
  .connect(MONGODB_URI)
  .then(() => 
    console.info("Succesfully connected to the database.")
  )
  .catch((error) => 
  console.error("An error has ocurred trying to connect to database.", error)
  )