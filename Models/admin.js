const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const adminModel = new mongoose.Schema({

    // identifant: String,
    // userId : String,
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
    password: { type: String, required: true },


});
adminModel.plugin(uniqueValidator);
module.exports = mongoose.model("admin", adminModel);