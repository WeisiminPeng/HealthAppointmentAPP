'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Doctor = new Schema({
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
        required: "Name is required"
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
<<<<<<< HEAD
    Appointment: {
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

=======
    Appointment:{
        type:Array
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
    
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
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
Doctor.virtual('id').get(function() {
=======
Doctor.virtual('id').get(function(){
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Doctor.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Doctor', Doctor);