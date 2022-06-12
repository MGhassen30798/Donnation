const mongoose = require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');


const articleModels = new mongoose.Schema({



    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyModels',
        require: true,

    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    articlePicture: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Clothes', 'foods', 'electronics', 'other'],
        default: 'other',
        required: true
    },
    Details: { type: String },


});

module.exports = mongoose.model("article", articleModels);