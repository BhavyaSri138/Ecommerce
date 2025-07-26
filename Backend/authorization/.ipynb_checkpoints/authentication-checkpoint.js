const express = require('express');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post("/login",async(req,res)=>{
    try{
            const {username,password} = req.body;
        const isValidUser = await user.findOne({username});
        if(!isValidUser){
            res.status(400).json({message : "invalid username"})
        }
        const isMatch = await bcrypt.compare(password,isValidUser.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid password"})
        }
        console.log(isValidUser,'valid');
        
        const token = jwt.sign(
            {
                userId : isValidUser._id,
                username : isValidUser.username
            },
            process.env.SECRET_KEY,
            {
                expiresIn : '1h'
            }

        )

        res.status(200).json({
            token : token,
            message : "user is verified"
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})


router.post("/register",async(req,res)=>{
    try{
        console.log(req.body,"request of register");
        const {username,password} = req.body;
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password,saltRounds)
        
        // const newUser = new user(req.body)
        const newUser = new user({username,password : hashPassword})
        const dataBaseUser = await newUser.save()
        res.json(dataBaseUser)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }

    
})


module.exports = router;