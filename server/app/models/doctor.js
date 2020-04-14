'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Doctor = new Schema({
    Name: {
        type: String,
        required: "Name is required"
    },
    Username: {
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
    Education: {
        type: String
    },
    Specialization: {
        type: String
    },
    Experience: {
        type: String
    },
    Designation: {
        type: String
    },
    DutyTiming: {
        type: String
    },
    Email: {
        type: String
    },
    Mobile: {
        type: String
    },
    Availability: {
        type: String
    },
    StartHour: {
        type: String
    },
    EndHour: {
        type: String
    },
    AvailableDays: {
        type: Array
    },
    WorkDays: {
        type: Array
    },
    Appointment: {
        type: Array
    }
}, {
    versionKey: false,
});

Doctor.virtual('id').get(function() {
    return this._id.toHexString();
});


Doctor.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Doctor', Doctor);