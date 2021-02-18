const { Schema, model } = require("mongoose");

const providerScrema = new Schema({
    cnpj: {
        type: String,
        allowNull: true
    },
    cpf: {
        type: String,
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
    type_store: {
        type: String,
        allowNull: true
    },
},
    {
        timestamps: true, //createdAt, updatedAt. Armazena automatico pelo mongoose dt de criação e atualização
    });

module.exports = model('Provider', providerScrema);