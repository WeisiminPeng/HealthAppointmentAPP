'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Patient = new Schema({
    Name: {
        type: String,
<<<<<<< HEAD
        required: "Name is required"
    },
    Username: {
        type: String,
        required: "Username is required"
    },
    Password: {
        type: String,
        required: "Password is required"
=======
        required: "title is required"
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
    },
    Gender: {
        type: String
    },
    Text: {
        type: String
    },
<<<<<<< HEAD
    DOB: {
        type: Date
=======
    DOB:{
        type:Date
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
    },
    Mobile: {
        type: String
    },
<<<<<<< HEAD
    Email: {
        type: String
    },
    Address: {
        type: String
    },
    Appointment: {
=======
    Address:{
        type: String
    },
    Appointment:{
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
        type: Array
    }
    // createDate: {
    //     type: Date,
    //     default: Date.now
    // },
    // modifiedDate: {
    //     type: Date,
    //     default: Date.now
    // }
}, {
<<<<<<< HEAD
    versionKey: false,
=======
    versionKey: false, 
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
    // timestamps: {
    //     createdAt: 'createDate',
    //     updatedAt: 'modifiedDate'
    // }
});

// Duplicate the id field as mongoose returns _id field instead of id.
<<<<<<< HEAD
Patient.virtual('id').get(function() {
=======
Patient.virtual('id').get(function(){
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Patient.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Patient', Patient);