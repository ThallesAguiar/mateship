const { Schema, model } = require("mongoose");

const providerScrema = new Schema({
    company_numbering: {
        type: Number,
        allowNull: true
    },
    personal_numbering: {
        type: Number,
        allowNull: true
    },
    name: {
        type: String,
        allowNull: false,
    },
    description: {
        type: String,
        allowNull: true
    },
    record_type: {
        type: String,
        allowNull: false
    },
    sale_type: {
        type: String,
        allowNull: false
    },
},
    {
        timestamps: true, //createdAt, updatedAt. Armazena automatico pelo mongoose dt de criação e atualização
    });

module.exports = model('Provider', providerScrema);