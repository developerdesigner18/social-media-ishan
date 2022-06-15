const express = require('express')
const route = express.Router()
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));
const Message = require('../models/message')
const jwt = require('jsonwebtoken')
const verify = require('./functions/varifytoke')

route.post('/addmessage',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
             
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            const { from, to, message } = req.body
            const newMessage = new Message({
                message: { text: message },
                users: [from, to],
                sender: from
            })
            newMessage.save()
            .then(()=>res.status(200).json({message: 'success'}))
            .catch((err)=>  res.status(400).json({message:err.message}))
        }
    })
})


module.exports= route