'use strict';

const controller = require('../controllers/controllerAppointment');
module.exports = function (app) {
    app.route('/appointments')
        .get(controller.list)
        .post(controller.save);

    app.route('/appointments/:username')
        .get(controller.get)

    app.route('appointments/search')
        .get(controller.searchAppointment)


    app.route('/appointments/:id')
        .put(controller.update)
        .delete(controller.delete);



};