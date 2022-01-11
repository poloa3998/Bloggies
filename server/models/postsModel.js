const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true, maxLength: 30 },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  published: { type: Boolean },
  timestamp: { type: Date },
  imgUrl: { type: String },
  likes: { type: Array },
});

module.exports = mongoose.model("Posts", PostSchema);
