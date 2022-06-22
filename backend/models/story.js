const mongoose = require("mongoose");

const StorySchema = mongoose.Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    storylist:{type: String},
    // createdAt: { type: Date, expires: '24h', default: Date.now }
  },
//   { timestamps: true }
);

const Story = mongoose.model("Story", StorySchema);
module.exports = Story;