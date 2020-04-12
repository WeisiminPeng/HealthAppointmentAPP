'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Patient = new Schema({
    Name: {
        type: String,
        required: "title is required"
    },
    Gender: {
        type: String
    },
    Text: {
        type: String
    },
    DOB:{
        type:Date
    },
    Mobile: {
        type: String
    },
    Address:{
        type: String
    },
    Appointment:{
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
    versionKey: false, 
    // timestamps: {
    //     createdAt: 'createDate',
    //     updatedAt: 'modifiedDate'
    // }
});

// Duplicate the id field as mongoose returns _id field instead of id.
Patient.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Patient.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Patient', Patient);