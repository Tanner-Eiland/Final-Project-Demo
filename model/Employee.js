const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employeeSchema = new schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Employee", employeeSchema);