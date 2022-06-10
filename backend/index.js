const express = require('express')
const app = express()
const Auth = require('./routes/authentication')
const Frogetpassword = require('./routes/forgetpassword')
const Resetpassword = require('./routes/resetpassword')
const Getalluser = require('./routes/getalluser')
const  cors = require("cors");
app.use(cors());

app.use ('/auth',Auth)
app.use('/forgetpass',Frogetpassword)
app.use('/resetpass',Resetpassword)
app.use('/getalluser',Getalluser)


app.listen(5000,()=>{
    console.log('server is runing');
})