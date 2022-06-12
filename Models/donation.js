const mongoose = require("mongoose");


const factureModel = new mongoose.Schema({

    refArticle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articleModels',
        required: true,

    },
    refuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,

    },

    refAss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'associationModelSchema',
        required: true,

    },
    refCash: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cashModels',
        required: true,

    },

    //name from db
    name: {
        type: String,
        required: true
    },

    // get price from db
    price: {
        type: Number,
        required: true
    },

    qte: {
        type: Number,
    },

});
module.exports = mongoose.model("facture", factureModel);