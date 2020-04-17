'use strict';

const messageService = require('../services/message-service');

/**
 * Sets response for messages search.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const promise = messageService.search({});
    const result = (messages) => {
        response.status(200);
        response.json(messages);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new message object and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    const message = Object.assign({}, request.body);
    const result = (savedMessage) => {
        response.status(201);
        response.json(savedMessage);
    };
    const promise = messageService.save(message);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns message response.
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const messageId = request.params.id;
    const result = (message) => {
        response.status(200);
        response.json(message);
    };
    const promise = messageService.get(messageId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the message resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
    const messageId = request.params.id;
    const updatedMessage = Object.assign({}, request.body);
    updatedMessage.id = messageId;
    const result = (message) => {
        response.status(200);
        response.json(message);
    };
    const promise = messageService.update(updatedMessage);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes an message resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const messageId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = messageService.delete(messageId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};