const mongoose = require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');


const cashModels = new mongoose.Schema({



    Ass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'associationModelSchema',
        require: true,

    },



    price: {
        type: Number,
        required: true
    },


});

module.exports = mongoose.model("article", articleModels);