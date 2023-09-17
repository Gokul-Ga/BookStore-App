const mongoose = require('mongoose')
const userScheme = mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    mobile: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

})
const userModel=mongoose.model('User', userScheme)
module.exports = userModel