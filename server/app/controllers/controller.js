'use strict';

//Import specific operations to database
const service = require('../services/service');

//Create and return a new todo in JSON based on the HTTP request
exports.save = function(req, res){
    const Newtodo = Object.assign({}, req.body);
    const result = (todo) => {
        res.status(200);
        res.json(todo);
    };

    const promise =  service.save(Newtodo);
    promise
    // service.save(Newtodo)
        .then(result)
        .catch(renderErrorResponse(res));
};

//Return an updated todo in JSON based on the update parameters
exports.update = function(req, res){
    const todo = Object.assign({}, req.body);
    const result = (todo) => {
        res.status(200);
        // res.json(todo);
        res.json({
            message: "Successfully Updated."
        });
    };

    todo._id = req.params.id;
    service.update(todo)
        .then(result)
        .catch(renderErrorResponse(res));
}

//Return a todo in JSON based on the search parameter
exports.get = function(req, res){
    const result = (todo) => {
        res.status(200);
        res.json(todo);
    }

    service.get(req.params.id)
        .then(result)
        .catch(renderErrorResponse(res));
};

//Return a list of todos in JSON based on the search parameters
exports.list = function(req, res){
    const totalQuery = req.query.total;
    const params = {};
    if(totalQuery) {
        params.total = totalQuery
    };
    const result = (todos) => {
        res.status(200);
        res.json(todos);
    };
    const promise = service.search(params);
    promise
        .then(result)
        .catch(renderErrorResponse(res));
};

//Delete and return the number of todo successfully deleted
exports.delete = function(req, res){
    const result = () => {
        res.status(200);
        res.json({
            message: "Successfully Deleted."
        });
    }

    service.delete(req.params.id)
        .then(result)
        .catch(renderErrorResponse(res));
};


//Throw error if error object is present
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};