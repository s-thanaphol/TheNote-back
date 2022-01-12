var express = require('express');
var router = express.Router();

const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const { models } = require('mongoose');



router.post("/login", async (req,res) => {

    try{
      
        const { username,password } = req.body ;
        if(!(username && password)){
            return res.status(400).send("All input is required");
        }

   
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))){
     
            const token = jwt.sign(
                { user_id: user._id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "24h"
                }
            )

            user.token = token;
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials.");
    } catch(err){
        console.log(err);
    }

});



router.post("/register", async (req,res) => {

    try{
  
        const {firstname,lastname,username,password} = req.body ;
        if (!(firstname && lastname && username && password)){
            return res.status(400).send("All input is required.");
        }

        
        const oldUser = await User.findOne({username:username});  

        if (oldUser){
            return res.status(409).send("This username has already been used.");
        }

    
        encrytedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            firstname:firstname,
            lastname:lastname,
            username:username ,
            password:encrytedPassword
        })

  
        const token = jwt.sign(
            { user_id: user._id, username},
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h"
            }
        )

        user.token = token;
  
        res.status(201).json(user);

    } catch(err){
        console.log(err);
    }
});

module.exports = router;
