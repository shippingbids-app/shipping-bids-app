const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    stream: {
      ref: "Stream",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
