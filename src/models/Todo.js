/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'todos.json');

module.exports = class Todo {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.date = data.date;
    this.guid = uuid.v4();
  }

  static getAll(cb) {
    fs.readFile(p, (err, data) =>{
      let allTodos = [];
      if(!err){
        allTodos = JSON.parse(data);
      }
      cb(allTodos);
    });
  }

  save() {
    fs.readFile(p, (err, data) => {
      let todos = [];
      if(!err){
        todos = JSON.parse(data);
        todos.push(this);
        fs.writeFile(p, JSON.stringify(todos), (err) => {
          console.log(err)
        });
      }
    });
  }

  getGuid() {
    return this.guid;
  }

  static update(todos) {
    fs.writeFile(p, JSON.stringify(todos), (err) => {
      console.log(err)
    });
  }
};
