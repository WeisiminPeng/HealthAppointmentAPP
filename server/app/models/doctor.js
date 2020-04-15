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
<<<<<<< HEAD
=======
    username: {
        type: String
    },
>>>>>>> 34830eb75e7e7afd107a1d7f54368c555ee87c42
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
// <<<<<<< HEAD

module.exports = mongoose.model('Doctor', Doctor);
// =======
module.exports = mongoose.model('Doctor', Doctor);
// >>>>>>> d4716122552e048ea0b43fe6f3f67b4248b200df
