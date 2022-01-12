var express = require('express');
var router = express.Router();

const Note = require('../model/blogNote');
const auth = require('../middleware/auth');

const { models } = require('mongoose');


router.post("/add", auth , async (req,res,next)=>{
    try{
        const {topic,description} = req.body ;
        const un = req.user.username ;
        if (!(topic&&description&&un)){
            return res.status(400).send("All input is required.");
        }
        
        const newnote = await Note.create({
            username:un,
            topic:topic,
            description:description
        })

        res.status(201).json(newnote);
    } catch(err){
        console.log(err);
    }
});


router.delete('/', auth , async  (req, res, next)=>{
    
    const notes = await Note.deleteOne({ _id: req.query._id });
    return res.status(200).json(notes);
});

router.get('/', auth , async  (req, res, next)=> {

    const un = req.user.username ;
    const notes = await Note.find({username:un});
    return res.status(200).json(notes);

});


module.exports = router;