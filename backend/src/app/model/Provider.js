const { Schema, model } = require("mongoose");

const providerSchema = new Schema({
    numbering: {
        type: String,
        allowNull: true,
        unique: true,
    },
    name: {
        type: String,
        allowNull: false,
    },
    description: {
        type: String,
        allowNull: true
    },
    phone: {
        type: String,
        allowNull: true,
    },
    whats: {
        type: String,
        allowNull: true,
    },
    recordType: {
        type: String,
        allowNull: false
    },
    saleType: {
        type: String,
        allowNull: false
    },
},
    {
        timestamps: true, //createdAt, updatedAt. Armazena automatico pelo mongoose dt de criação e atualização
    });

module.exports = model('Provider', providerSchema);