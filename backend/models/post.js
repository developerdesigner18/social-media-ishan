const mongooes = require("mongoose");
const Post = new mongooes.Schema(
  {
    username:{
        type:String
    },
    caption:{
        type:String
    },
    postimage:{
        type:String
    },
    postTime :{
        type:String
    },
    postLike:{
        type:[String],
        
    }
  }
);
module.exports = mongooes.model("Post", Post);