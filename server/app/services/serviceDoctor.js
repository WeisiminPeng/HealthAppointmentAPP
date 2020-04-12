'use strict';

const mongoose = require('mongoose');
const Doctor = mongoose.model('Doctor');

exports.save = function(params){
    const newDoctor = new Doctor(params);
    return newDoctor.save();
    // const promise = newTodo.save();
    // return promise;
}

exports.search = function(params){
    const promise = Doctor.find(params).exec();
    return promise;
};

exports.get = function(id){
    const promise = Doctor.findById(id).exec();
    return promise;
}

exports.update = function(doctor){
    const promise = Doctor.findOneAndUpdate({_id: doctor._id}, doctor).exec();
    return promise;
}

exports.delete = function(id){
    const promise = Doctor.remove({_id: id}).exec();
    return promise;
}