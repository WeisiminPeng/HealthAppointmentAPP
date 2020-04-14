'use strict';

const controller = require('../controllers/controller');
module.exports = function(app){
    app.route('/todos')
        .get(controller.list) //List all the todos
        .post(controller.save); //Create a new todos

    app.route('/todos/:id')
        .get(controller.get) //Fetch one todo
        .put(controller.update) //Update one todo
        .delete(controller.delete); //Delete one todo
};