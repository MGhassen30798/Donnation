const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');



const associationModelSchema = new mongoose.Schema({


    emailAssociation: { type: String, required: true, unique: true },
    passwordAssociation: { type: String, required: true },
    phoneNumberAssociation: { type: Number, required: true },
    lastNameAssociation: { type: String, required: true },
    firstNameAssociation: { type: String, required: true },
    brandPicAssociation: {
        type: String,
        default: "https://res.cloudinary.com/showapp/image/upload/v1655013278/logo_ptf_unicef_sec9nb.jpg"
    },
    businessNameAssociation: { type: String, required: true },
    verifiedAssociation: { type: Boolean, default: true },



});

associationModelSchema.plugin(uniqueValidator);
const Association = mongoose.model("association", associationModelSchema);
module.exports = { Association }