const express = require('express')
const app = express()
const Auth = require('./routes/authentication')

app.use ('/auth',Auth)

app.listen(5000)