const express = require('express')
const route = express.Router()

route.get('/',(req,res)=>{
    res.send('route complete')
})

module.exports= route