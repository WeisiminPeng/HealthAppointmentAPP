'use strict';

const controller = require('../controllers/controllerDoctor');
module.exports = function(app){
    app.route('/doctors')
        .get(controller.list)
        .post(controller.save); 

    app.route('/doctors/:username')
        .get(controller.get) 
        .put(controller.update) 
        .delete(controller.delete); 
        
};