'use strict';

const mongoose = require('mongoose');
const Doctor = mongoose.model('Doctor');

exports.save = function(params) {
    const newDoctor = new Doctor(params);
    return newDoctor.save();
    // const promise = newTodo.save();
    // return promise;
}

exports.search = function(params) {
    const promise = Doctor.find(params).exec();
    return promise;
};

exports.get = function(username) {
    const promise = Doctor.findOne({ username: username }).exec();
    return promise;
}

exports.update = function(doctor) {
    const promise = Doctor.findOneAndUpdate({ username: doctor.username }, doctor).exec();
    return promise;
}

exports.delete = function(username) {
    const promise = Doctor.remove({ username: username }).exec();
    return promise;
}