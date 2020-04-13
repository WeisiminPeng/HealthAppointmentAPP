'use strict';

const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');

exports.save = function(params){
    const newPatient = new Patient(params);
    return newPatient.save();
    // const promise = newTodo.save();
    // return promise;
}

exports.search = function(params){
    const promise = Patient.find(params).exec();
    return promise;
};

exports.get = function(username){
    const promise = Patient.findOne({username:username}).exec();
    return promise;
}

exports.update = function(patient){
    const promise = Patient.findOneAndUpdate({username: patient.username}, patient).exec();
    return promise;
}

exports.delete = function(id){
    const promise = Patient.remove({username: username}).exec();
    return promise;
}