const mongoose= require('mongoose')
const Comment = new mongoose.Schema(
    {
        postId : {
            type:String
        },
        cmtArray : [{
            username:String,
            comment : String,
        }]
    }
)
module.exports = mongooes.model("Comment", Comment);