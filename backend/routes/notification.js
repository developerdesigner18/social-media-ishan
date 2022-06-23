const express = require('express')
const route = express.Router()

const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));
const Notification=require('../models/notification')
const User = require("../models/user");
const Story = require('../models/story')
const jwt = require('jsonwebtoken')
const verify = require('./functions/varifytoke')

route.post('/addtonotification',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            console.log('hello');
            // var {sender,receiver,postid,like,comment,commentText} = req.body
            var newNotification = new Notification(req.body)
            newNotification.save()
            .then((response)=>{
                console.log('notification send');
                res.status(200).json(response)})
            .catch((err)=>{res.status(403).json({message : err})})
        }
    })
})

route.post('/fatchnotification',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            Notification.find({receiver:req.body.username})
            .populate('sender')
            .populate('postid')
            .then((response)=>{
                res.status(200).json(response)
            })
            .catch((err)=>{
                res.status(403).json({message:'somthing went wrong'})
            })
        }
    })
})


module.exports= route