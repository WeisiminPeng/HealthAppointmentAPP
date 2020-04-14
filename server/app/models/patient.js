'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Patient = new Schema({
    Name: {
        type: String,
        required: "Name is required"
    },
    username: {
        type: String,
        required: "Username is required"
    },
    Password: {
        type: String,
        required: "Password is required"
    },
    Gender: {
        type: String
    },
    Text: {
        type: String
    },

    DOB: {
        type: Date
    },
    Mobile: {
        type: String
    },
    Email: {
        type: String
    },
    Address: {
        type: String
    }
}, {
    versionKey: false,
});

Patient.virtual('id').get(function() {
    return this._id.toHexString();
});
Patient.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Patient', Patient);