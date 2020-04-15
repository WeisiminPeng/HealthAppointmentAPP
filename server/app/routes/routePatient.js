'use strict';

const controller = require('../controllers/controllerPatient');
module.exports = function(app){
    app.route('/patients')
        .get(controller.list) //List all the patients
        .post(controller.save); //Create a new patient

    app.route('/patients/:username')
        .get(controller.get) //Fetch one patient by username
        .put(controller.update) //Update one patient by username
        .delete(controller.delete); //Delete one patient  by username
        
};