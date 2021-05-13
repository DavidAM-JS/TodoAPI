const express = require('express');
const { todosController } = require('../controllers');
const { todosValidation } = require('../validations');

const todosResources = express.Router();

todosResources.get('/', todosController.getAll);
todosResources.get('/:guid', todosController.getByGuid);
todosResources.post('/', todosValidation.validateTodo, todosController.createTodo);
todosResources.put('/:guid', todosValidation.validateTodo, todosController.updateTodo);
todosResources.delete('/:guid', todosController.deleteTodo);

module.exports = todosResources;
