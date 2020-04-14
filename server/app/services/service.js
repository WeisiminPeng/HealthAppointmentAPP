'use strict';

const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

exports.save = function(params){
    const newTodo = new Todo(params);
    return newTodo.save();
    // const promise = newTodo.save();
    // return promise;
}

exports.search = function(params){
    const promise = Todo.find(params).exec();
    return promise;
};

exports.get = function(id){
    const promise = Todo.findById(id).exec();
    return promise;
}

exports.update = function(todo){
    const promise = Todo.findOneAndUpdate({_id: todo._id}, todo).exec();
    return promise;
}

exports.delete = function(id){
    const promise = Todo.remove({_id: id}).exec();
    return promise;
}