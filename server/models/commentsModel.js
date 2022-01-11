const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  commentContent: { type: String, required: true },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Comments", CommentSchema);
