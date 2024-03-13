const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    department:{
        type: String,
        enum: ['IT', 'HR', 'Finance', 'Marketing'],
        required: true
    },
    designation: {
        type: String,
        required: true
    },

mail:{
    type: String,
    required: true,
    unique: true
},
phone:{
    type: String,
    required: true,
    validate:{
        validator: function(v) {
            return /^\d{10}$/.test(v);
        },
        message: porps => `${props.value} is not a valid phone number!`
    }
}
});

module.exports = mongoose.model('Employee', employeeSchema);