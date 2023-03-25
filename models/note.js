const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    date : {type : String}
}) 

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;