'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Appointment = new Schema({
    PatientUsername: {
        type: String
    },
    DoctorUsername: {
        type: String
    },
    PatientName: {
        type: String
    },
    DoctorName:{
        type:String
    },
    StartTime: {
        type: String
    },
    EndTime:{
        type: String
    },
    Symptims:{
        type: String
    },
    Id:{
        type: String
    },
    CategoryColor: {
        type: String
    },
    Status:{
        type:Boolean,
        default: false
    }
}, {
    versionKey: false, 
});

// Duplicate the id field as mongoose returns _id field instead of id.
Appointment.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Appointment.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Appointment', Appointment);
