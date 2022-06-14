const express = require('express')
const route = express.Router()
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require('jsonwebtoken')
const verify = require('./functions/varifytoke')

route.post('/',verify,(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            console.log('hello in else');
            User.find({username:req.body.username})
            .then((user)=>{
                
                if(!user[0].following.includes(req.body.followuser)){
                    User.updateOne({username:req.body.username},{"$push":{following:req.body.followuser}})
                    .then(()=>{
                        console.log('follow');
                        res.status(200).json({message: 'follow user'})
                    })
                    .catch((err)=> { 
                        console.log('err',err);
                        res.status(400).json({message:err.message})})
                }
                else{
                    User.updateOne({username:req.body.username},{"$pullAll":{following:[req.body.followuser]}})
                    .then(()=>{
                        console.log('un follow');
                        res.status(200).json({message: 'Un follow user'})
                    })
                    .catch((err)=> { 
                        console.log('err',err);
                        res.status(400).json({message:err.message})})
                }
            })
            .catch((err)=>{console.log('err',err);})
        }
    })
})
module.exports= route