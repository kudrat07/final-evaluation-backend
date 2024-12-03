const mongoose = require("mongoose")
const cardSchema  = new mongoose.Schema({
    cardNumber: {
        type: String,
        trim: true,
        required: true,
    },
    expiration:{
        type: String,
        trim: true,
        required: true,
    },
    cvv:{
        type: String,
        trim:true,
        required:true,
    },
    cardHolderName:{
        type: String,
        trim: true,
        required: true,
    }

})
module.exports = mongoose.model("cards", cardSchema)