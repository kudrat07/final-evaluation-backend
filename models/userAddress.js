const mongoose = require("mongoose");
const userAddress = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city:{
        type: String,
        required: true,
        trim:true,
    },
    pinCode:{
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber:{
        type:String,
        required: true,
        trim:true,
    },
    fullAddress:{
        type: String,
        required: true,
        trim: true
    },
})
module.exports = mongoose.model("Address", userAddress);