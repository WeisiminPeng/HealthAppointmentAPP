'use strict';

//Import specific operations to database
const service = require('../services/servicePatient');

//Create and return a new todo in JSON based on the HTTP request
exports.save = function(req, res){
    const NewPatient = Object.assign({}, req.body);
    const result = (patient) => {
        res.status(200);
        res.json(patient);
    };

    const promise =  service.save(NewPatient);
    promise
    // service.save(Newtodo)
        .then(result)
        .catch(renderErrorResponse(res));
};

//Return an updated todo in JSON based on the update parameters
exports.update = function(req, res){
    const patient = Object.assign({}, req.body);
    const result = (patient) => {
        res.status(200);
        // res.json(todo);
        res.json({
            message: "Successfully Updated."
        });
    };

    patient.username = req.params.username;
    service.update(patient)
        .then(result)
        .catch(renderErrorResponse(res));
}

//Return a todo in JSON based on the search parameter
exports.get = function(req, res){
    const result = (patient) => {
        res.status(200);
        res.json(patient);
    }

    service.get(req.params.username)
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
    const result = (patients) => {
        res.status(200);
        res.json(patients);
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

    service.delete(req.params.username)
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