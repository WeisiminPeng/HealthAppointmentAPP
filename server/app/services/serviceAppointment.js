'use strict';

const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

exports.save = function (params) {
    console.log(params);
    const newAppointment = new Appointment(params);
    return newAppointment.save();
    // const promise = newTodo.save();
    // return promise;
}

exports.search = function (params) {
    const promise = Appointment.find(params).exec();
    return promise;
};

exports.get = function (username) {
    // const promise = Appointment.findById(id).exec();
    const promise = Appointment.find({
        $or: [
            {
                PatientUsername: { $eq: username }
            },
            {
                DoctorUsername: { $eq: username }
            }
        ]
    }).exec();
    return promise;
}

exports.update = function (appointment) {
    const promise = Appointment.findOneAndUpdate({ _id: appointment._id }, appointment).exec();
    return promise;
}

exports.delete = function (id) {
    console.log(id)
    const promise = Appointment.remove({ _id: id }).exec();
    return promise;
}

// search by patient||doctor username
exports.searchByUsername = function (params) {
    const promise = Appointment.fins({
        $or: [
            {
                PatientUsername: { $eq: params.PatientUsername }
            },
            {
                DoctorUsername: { $eq: params.DoctorUsername }
            }
        ]
    }).exec();
    return promise;
}