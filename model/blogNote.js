const mongoose = require('mongoose');

const note = new mongoose.Schema({
    username : {type: String},
    topic : {type: String},
    description : {type: String}
})

module.exports = mongoose.model('note',note);