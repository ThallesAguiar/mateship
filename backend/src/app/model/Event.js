const { Schema, model } = require("mongoose");

const eventScrema = new Schema({
    country: {
        type: String,
        allowNull: false
    },
    date_event: {
        type: Date,
        allowNull: false,
    },
    location_reference: {
        type: String,
        allowNull: true
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    id_address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },
},
    {
        timestamps: true, //createdAt, updatedAt. Armazena automatico pelo mongoose dt de criação e atualização
    });

module.exports = model('Event', eventScrema);