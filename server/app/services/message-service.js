'use strict';
const mongoose = require('mongoose'),
    Message = mongoose.model('Message');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Message.find(params).exec();
    return promise;
};

/**
 * Saves the new message object.
 *
 * @param message
*/
exports.save = (message) => {
    const newMessage = new Message(message);
    return newMessage.save();
};

/**
 * Updates an existing message.
 *
 * @param updatedMessage
*/
exports.update = (updatedMessage) => {
    const promise = Message.findByIdAndUpdate(updatedMessage.id, updatedMessage).exec();
    return promise;
};

/**
 * Returns the message object by id.
 *
 * @param messageId
*/
exports.get = (messageId) => {
    const messagePromise = Message.findById(messageId).exec();
    return messagePromise;
};

/**
 * Deletes an existing message object.
 *
 * @param messageId
*/
exports.delete = (messageId) => {
    const promise = Message.findByIdAndRemove(messageId).exec();
    return promise;
};