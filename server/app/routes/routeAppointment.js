'use strict';

const controller = require('../controllers/controllerAppointment');
module.exports = function (app) {
    app.route('/appointments')
        .get(controller.list)
        .post(controller.save);

    app.route('/appointments/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
        
    app.route('appointments/search')
        .get(controller.searchAppointment)




};