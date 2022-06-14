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
        
    },
    cmtArray : [{
        username:String,
        comment : String,
        commentTime: String,
    }]
  }
);
module.exports = mongooes.model("Post", Post);