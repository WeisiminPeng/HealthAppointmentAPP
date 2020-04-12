'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Doctor = new Schema({
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
    }
    
        // Day: {
        //     type: String
        // },
        // Index: {
        //     type: Number
        // },
        // Enable: {
        //     type: Boolean
        // },
        // WorkStartHour: {
        //     type: Date
        // },
        // WorkEndHour: {
        //     type: Date
        // },
        // BreakStartHour: {
        //     type: Date
        // },
        // BreakEndHour: {
        //     type: Date
        // },
        // State: {
        //     type: String
        // }
    // }
    
    // time: {
    //     type: Date,
    //     default: Date.now
    // }
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
Doctor.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Doctor.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Doctor', Doctor);