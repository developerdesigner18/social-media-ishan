const mongooes = require("mongoose");
const User = new mongooes.Schema(
  {
    username: {
        type:String, 
        unique: true,
        index: true,
        required: true 
    },
    profileImage:{
        type:String
    },
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
    bio:{
        type:String,
    }
    
  }
);
module.exports = mongooes.model("User", User);