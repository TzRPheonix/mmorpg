const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    starterName: {
        default: "None",
        type: String
    },
    starterMAXPV: {
        default: 0,
        type: Number
    },
    starterPV: {
        default: 0,
        type: Number
    },
    starterDMG: {
        default: 0,
        type: Number
    },
    starterLVL: {
        default: 1,
        type: Number
    },
    killCount: {
        default: 0,
        type: Number
    },
    resetToken: {
        type: String
    },
    resetTokenExpires: {
        type: Date
    }
});

module.exports = mongoose.model('userCollection', userSchema);
