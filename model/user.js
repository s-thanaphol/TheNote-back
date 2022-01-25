const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {type: String},
    lastname : {type: String},
    username : {type: String, unique: true},
    password : {type: String},
    token : {type: String}
})

module.exports = mongoose.model('user',userSchema);
