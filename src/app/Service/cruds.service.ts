import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../environment/config';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  todoApi =enviroment.toAPI;

  constructor(private _http: HttpClient) { }

  //=================GET DATA METHOD
  getTodos() {
    return this._http.get<Array<Todos>>(this.todoApi);
  }


  //=================POST DATA METHOD
  addTodo(todo: Todos) {
    return this._http.post(`${this.todoApi}`, todo);
  }
  //=================POST DATA METHOD API
  addTask(todoId, task) {
    return this._http.post(`${this.todoApi}/${todoId}/task`, task);
  }


  //=================EDIT DATA METHOD
  editTodo(todo: Todos) {
    return this._http.put(`${this.todoApi}/${todo.id}`, todo);
  }
  //=================EDIT DATA METHOD API
  editTask(todoId, task) {
    return this._http.put(`${this.todoApi}/${todoId}/task/${task.id}`, task)
  }


  //=================DELETE DATA METHOD
  deleteTodo(todo: Todos) {
    return this._http.delete(`${this.todoApi}/${todo.id}`)
  }
  //=================DELETE DATA METHOD API
  deleteTask(todoId, task: Todos) {
    return this._http.delete(`${this.todoApi}/${todoId}/task/${task.id}`)
  }
}

//=================CLASS 
export class Todos {
  id: number;
  name: string;
  addedon: Date = new Date();
  tasks: Array<Tasks> = new Array<Tasks>();

  // Ui new Item Add True False
  isInput: boolean = false;
}
export class Tasks {
  id: number;
  todoId: number;
  isCompleted: boolean = false;
  name: string;
}
