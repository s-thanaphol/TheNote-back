const mongoose = require('mongoose');

const { MONGO_URI } = process.env ;

exports.connect = () =>{
    //connecting to the database
    mongoose.connect(MONGO_URI,{
        useNewUrlParser : true ,
        useUnifiedTopology : true
    })
    .then(()=>{
        //เข้าดาต้าเบสสำเร็จ
        console.log("Successfully connected to database");
    }) 
    .catch((error)=>{
        //เข้าไม่ได้
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1); //ให้exitออกไป
    });
}