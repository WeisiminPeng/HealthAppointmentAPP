'use strict';

const controller = require('../controllers/controllerDoctor');
module.exports = function(app){
    app.route('/doctors')
        .get(controller.list) //List all the todos
        .post(controller.save); //Create a new todos

    app.route('/doctors/:username')
        .get(controller.get) //Fetch one todo
        .put(controller.update) //Update one todo
        .delete(controller.delete); //Delete one todo
        
};