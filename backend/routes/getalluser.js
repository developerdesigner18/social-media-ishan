const express = require('express')
const route = express.Router()
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));

const User = require("../models/user");

mongoose.connect('mongodb+srv://ishanPatel:Ishan3104@cluster0.ikxah.mongodb.net/socialMedia');

route.get('/',(req,res)=>{
    User.find()
    .then((data)=>{
        return res.status(200).json({data:data})
    })
    .catch((err)=>{
        return res.status(500).json({message:error.message})
    })
})

module.exports= route