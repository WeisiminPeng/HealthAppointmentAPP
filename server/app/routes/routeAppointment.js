'use strict';

const controller = require('../controllers/controllerAppointment');
module.exports = function (app) {
    app.route('/appointments')
        .get(controller.list) //list all the appointments
        .post(controller.save);  //save one appointment

    app.route('/appointments/:username')
        .get(controller.get)   //search appointment by (doctor||patient)'s username

    app.route('/appointments/:id')
        .put(controller.update)  //update appointment by id
        .delete(controller.delete); //delete appointment by id



};