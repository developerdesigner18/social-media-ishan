const express = require('express')
const route = express.Router()
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));
const Post = require("../models/post");
const jwt = require('jsonwebtoken')
const verify = require('./functions/varifytoke')

route.post('/',verify,async(req,res)=>{
    jwt.verify(req.token , 'secretkey',(err,data)=>{
        if(err){
            console.log('403 jwt if err');
            res.sendStatus(403)
        }
        else{
            Post.findOne({_id:req.body.id})
            .then((data)=>{
                if(!data.postLike.includes(req.body.username)){
                    
                    Post.updateOne({_id :req.body.id},{"$push":{postLike: req.body.username} })
                    .then(()=>console.log('like post'))
                    .catch((err)=>console.log('post not like',err))
                }
                else{
                    Post.updateOne({_id :req.body.id},{"$pullAll":{postLike: [req.body.username]} })
                    .then(()=>console.log('in else' ))
                    .catch((err)=>console.log('post not like',err))
                }
            })
            .catch((err)=>console.log('err',err))
            
        }
    })
})

module.exports= route