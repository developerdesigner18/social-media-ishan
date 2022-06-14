const mongooes = require("mongoose");
const User = new mongooes.Schema(
  {
    username: {
        type:String, 
        unique: true,
        index: true,
        required: true },
    email: {
        type:String
    },
    password : {
        type:String,
    },
    phone:{
        type:String
    },
    following:{
        type:Array,
        default:[]
    },
    profileImage : {
        type: String,
    }
  }
);
module.exports = mongooes.model("User", User);