'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Doctor = new Schema({
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
    Education: {
        type: String
    },
    Specialization: {
        type: String
    },
    Experience: {
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
    AvailableDays: {
        type: Array
    },
    username: {
        type: String
    },
    WorkDays: {
        type: Array
    }
}, {
    versionKey: false,
});

// Duplicate the id field as mongoose returns _id field instead of id.
// Doctor.virtual('id').get(function(){
//     return this._id.toHexString();
// });



Doctor.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Doctor', Doctor);