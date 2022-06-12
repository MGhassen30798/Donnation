const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
//var passwordValidator = require('password-validator');



const companyModelSchema = new mongoose.Schema({


    emailCompany: { type: String, required: true, unique: true },
    passwordCompany: { type: String, required: true },
    phoneNumberCompany: { type: Number, required: true },
    lastNameCompany: { type: String, required: true },
    firstNameCompany: { type: String, required: true },
    brandPicCompany: { type: String, required: true },
    businessNameCompany: { type: String, required: true },
    verifiedCompany: { type: Boolean, default: false },



});

companyModelSchema.plugin(uniqueValidator);
const Company = mongoose.model("company", companyModelSchema);
module.exports = { Company }