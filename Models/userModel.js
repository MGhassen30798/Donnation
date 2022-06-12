const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userModel = new mongoose.Schema({

    // identifant: String,
    // userId : String,
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
    password: { type: String, },
    phoneNumber: { type: String, },
    profilePicture: String,
    firstName: { type: String, },
    lastName: { type: String, },
    verified: {
        type: Boolean,
        default: false
    },
    newsLettre: { type: Boolean, default: false }
});
userModel.plugin(uniqueValidator);
module.exports = mongoose.model("user", userModel);