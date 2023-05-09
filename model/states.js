const mongoose = require('mongoose');
const schema = mongoose.Schema;

const statesSchema = new schema({
    stateCode: {
        type: String, 
        required: true,
        unique: true
    },
    funFacts: {
        type: [String],
        default: undefined
        
    }
})

module.exports = mongoose.model("States", statesSchema);