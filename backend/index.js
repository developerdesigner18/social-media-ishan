const express = require('express')
const app = express()
const Auth = require('./routes/authentication')
const Frogetpassword = require('./routes/forgetpassword')
const Resetpassword = require('./routes/resetpassword')
const Getalluser = require('./routes/getalluser')
const AddPost = require('./routes/addnewPost')
const likepost = require('./routes/likepost')
const  cors = require("cors");
app.use(cors());
const path = require('path')
app.use('/static', express.static(path.resolve('uploads')))


app.use ('/auth',Auth)
app.use('/forgetpass',Frogetpassword)
app.use('/resetpass',Resetpassword)
app.use('/getalluser',Getalluser)
app.use('/addpost',AddPost)
app.use('/likepost',likepost)


app.listen(5000,()=>{
    console.log('server is runing');
})