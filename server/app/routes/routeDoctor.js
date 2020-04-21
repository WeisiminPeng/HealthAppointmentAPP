'use strict';

const controller = require('../controllers/controllerDoctor');
module.exports = function(app) {
    app.route('/doctors')
        .get(controller.list) //list all the doctors
        .post(controller.save); //save one new doctor

    app.route('/doctors/:username')
        .get(controller.get) //get one doctor by username
        .put(controller.update) //update one doctor busername
        .delete(controller.delete); //delete one doctor by username


};