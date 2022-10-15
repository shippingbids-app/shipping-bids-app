const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isValidNumber} = require("libphonenumber-js")

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_PATTERN = /.{8,}$/;
const WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      validate: {
        validator: function (image) {
          try {
            new URL(image);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: (image) => "Invalid URL",
      },
    },
    email: {
      type: String,
      required: "Email is required",
      trim: true,
      lowercase: true,
      unique: true,
      match: [EMAIL_PATTERN, "Invalid email"],
    },
    password: {
      type: String,
      required: "Password is required",
      match: [PWD_PATTERN, "Password needs at least 8 chars"],
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function(phoneNumber) {
          try {
            let esPhoneNumber = "+34" + phoneNumber
            return isValidNumber(esPhoneNumber)            
          } catch (error) {
            return false
          }
        },
        message: "Phone number is invalid"
      }
    },
    rating: Number
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id || ret.id;
        delete ret._id;
        delete ret.password;

        return ret;
      },
    },
  }
);

userSchema.virtual("offers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "author"
})

userSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "author"
})

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.pre("validate", function(next) {
  this.image = this.image || undefined
  next()
}),

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
