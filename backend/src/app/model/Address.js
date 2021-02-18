const { Schema, model } = require("mongoose");

const addressScrema = new Schema({
    country: {
        type: String,
        allowNull: true,
        default: null,
    },
    state: {
        type: String,
        allowNull: true,
        default: null,
    },
    city: {
        type: String,
        allowNull: true,
        default: null,
    },
    lat: {
        type: Number,
        default: null,
    },
    lng: {
        type: Number,
        default: null
    },
},
    {
        timestamps: true, //createdAt, updatedAt. Armazena automatico pelo mongoose dt de criação e atualização
    });

module.exports = model('Address', addressScrema);