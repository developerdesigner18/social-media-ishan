const mongoose = require("mongoose");
const User = new mongoose.Schema(
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
    },
    story:[{type: mongoose.Schema.Types.ObjectId, ref: "Story"}]
    
  }
);
module.exports = mongoose.model("User", User);