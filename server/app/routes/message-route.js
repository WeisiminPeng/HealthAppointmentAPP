'use strict';

const messageController = require('../controllers/message-controller');
module.exports = function(app){
    app.route('/messages')
        .get(messageController.list) //List all the messages
        .post(messageController.save); //Create a new message

    app.route('/messages/:id')
        .get(messageController.get) //Fetch one message
        .put(messageController.update) //Update one message
        .delete(messageController.delete); //Delete one message
};