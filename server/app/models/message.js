'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
{
      idD: "1d",//id of doctor
      idP: "1p",//id of patient
      chatlist: [
        { id: "1d", content: "content 1." },
        { id: "1d", content: "content 2." },
        { id: "1d", content: "content 3." },
        { id: "1p", content: "content 4." }
      ]
    }
* */
//Create the data model
let Message = new Schema({
    idD:{//id of doctor
        type:String
    },
    idP:{//id of patient
        type:String
    },
    chatlist:{
        type: Array
    }
}, {
    versionKey: false, 
});

// Duplicate the id field as mongoose returns _id field instead of id.
Message.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Message.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Message', Message);