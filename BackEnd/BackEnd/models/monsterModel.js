const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    monstername: {
        required: true,
        type: String
    },
    monsterPV: {
        required: true,
        type: Number
    },
    monsterDMG: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('monsterCollection', monsterSchema);
