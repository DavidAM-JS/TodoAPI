const { Todo } = require('../models');

const getAll = (request, response) => {
  Todo.getAll((allTodos) => {
      response.status(200).send(allTodos);
    });
};

const createTodo = (request, response) => {
  const body = request.body;
  const newTodo = new Todo(body);
  Todo.getAll((allTodos) => {
    if (allTodos.some((todo) => {
      const todoInfo = Object.entries(todo).slice(0, 2);
      return todoInfo.every((data) => data[1] === newTodo[data[0]]);
    })) {
      return response.status(409).send({
        message: 'This todo already exists and there can not be duplicated',
      });
    }
    newTodo.save();
    response.status(201).send({
      message: 'Todo has been created!',
      guid: newTodo.getGuid(),
    });
  });
};

const getByGuid = (request, response) => {
  const { guid } = request.params;
  Todo.getAll((allTodos) => {
    const selectedTodo = allTodos.find((todo) => todo.guid === guid);
    if (selectedTodo) {
      return response.status(200).send(selectedTodo);
    }
    return response.status(404).send({
      message: 'There was no any todo with that Guid',
    });
  });
}

const updateTodo = (request, response) => {
  const { guid } = request.params;
  const body = request.body;
  Todo.getAll((allTodos) => {
    console.log(guid)
    const todo = allTodos.find((todo) => {
      return todo.guid === guid;
    });
    if (todo) {
      const duplicatedTodo = allTodos.filter((todo) => {
        if (todo.title === body.title && todo.author === todo.author && todo.date === body.date) {
          return todo;
        }
      });
      if (duplicatedTodo.length > 0) {
        return response.status(409).send({
          message: 'This todo already exists and todo can not be duplicated',
        });
      }
      Object.assign(todo, body);
      Todo.update(allTodos);
      response.send({
        message: 'Todo has been updated!',
      });
    } else {
      response.status(404).send({
        message: 'There was no any todo with that Guid',
      });
    }
  });
};

const deleteTodo = (request, response) => {
  const { guid } = request.params;
  Todo.getAll((allTodos) => {
    const todoGuid = allTodos.findIndex((todo) => {
      return todo.guid === guid
    });
    if (todoGuid !== -1) {
      allTodos.splice(todoGuid, 1);
      Todo.update(allTodos);
      return response.status(200).send({
        message: 'Todo has been deleted',
      });
    }
    return response.status(404).send({
      message: 'There was no any todo with that Guid',
    });
  });
};

module.exports = {
  getAll,
  getByGuid,
  createTodo,
  updateTodo,
  deleteTodo,
};
