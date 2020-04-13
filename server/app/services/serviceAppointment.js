'use strict';

const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

exports.save = function (params) {
    const newAppointment = new Appointment(params);
    return newAppointment.save();
    // const promise = newTodo.save();
    // return promise;
}

exports.search = function (params) {
    const promise = Appointment.find(params).exec();
    return promise;
};

exports.get = function (id) {
    const promise = Appointment.findById(id).exec();
    return promise;
}

exports.update = function (appointment) {
    const promise = Appointment.findOneAndUpdate({ _id: appointment._id }, appointment).exec();
    return promise;
}

exports.delete = function (id) {
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