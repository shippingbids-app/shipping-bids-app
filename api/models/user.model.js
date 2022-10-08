const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { parsePhoneNumber, isPossiblePhoneNumber, isValidNumber} = require("libphonenumber-js")
// const roles = require("../data/roles")
// const { capacities, services, vehicles } = require("../data")

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_PATTERN = /.{8,}$/;
// const PHN_PATTERN =
//   /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
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
        message: (image) => "Invalid URL", //IMAGE AQUI SIRVE PARA ALGO???
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
    phone_number: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // match: [PHN_PATTERN, "Invalid phone number"],
      validate: {
        validator: function(phone_number) {
          try {
            parsePhoneNumber(phone_number, "ES")
            let phoneNumber = "+34" + phone_number
            return isValidNumber(phoneNumber)            
          } catch (error) {
            return false
          }
        },
        message: "Phone number is invalid"
      }
    },
    // roles: {
    //   type: [
    //     {
    //       type: String,
    //       required: "Role is required",
    //       enum: roles.map((role) => role.value),
    //     },
    //   ],
    //   default: [], //ESTO ES NECESARIO????
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
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

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
