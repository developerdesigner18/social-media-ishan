const express = require('express')
const route = express.Router()
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));
const verify = require('./functions/varifytoke')
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb+srv://ishanPatel:Ishan3104@cluster0.ikxah.mongodb.net/socialMedia');

route.get('/',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            User.find()
            .then((data)=>{
                return res.status(200).json({data:data})
            })
            .catch((err)=>{
                return res.status(500).json({message:error.message})
            })
        }
    })
   
})
route.get('/post',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            Post.find()
            .then((data)=>{
                return res.status(200).json({data:data})
            })
            .catch((err)=>{
                return res.status(500).json({message:error.message})
            })
        }
    })
   
})

route.post('/userprofile',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            User.find({username:req.body.username})
            .then((data)=>{
                return res.status(200).json({data:data})
            })
            .catch((err)=>{
                return res.status(500).json({message:err.message})
            })
        }
    })
})

module.exports= route