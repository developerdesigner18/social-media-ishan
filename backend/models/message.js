const mongooes = require("mongoose");
const Message = new mongooes.Schema(
  {
    message: {
        text: { type: String, required: true },
      },
    users: {
        type:Array
    },
    sender: {
    type: String,
    required: true,
    },    
  },
  {
    timestamps: true,
  }
);
module.exports = mongooes.model("Message", Message);