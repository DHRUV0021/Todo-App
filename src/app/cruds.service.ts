import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  // JsonUrl = "http://localhost:3000/Todos";//JSON URL
  JsonUrl = "http://10.10.5.124:16100/todo";//JSON URL

  constructor(private http: HttpClient) { }

  //=================GET DATA METHOD
  getItem() {
    return this.http.get<Array<TodosApp>>(this.JsonUrl);
  }


  //=================POST DATA METHOD
  AddItem(Data: TodosApp) {
    return this.http.post(`${this.JsonUrl}`, Data);
  }
  //=================POST DATA METHOD API
  addInnerListData(TodoId, body) {
    return this.http.post(`http://10.10.5.124:16100/todo/${TodoId}/task`, body);
  }


  //=================EDIT DATA METHOD
  editItem(Data: TodosApp) {
    return this.http.put(`${this.JsonUrl}/${Data.id}`, Data);
  }
  //=================EDIT DATA METHOD API
  editInnerListData(TodoId, body) {
    return this.http.put(`http://10.10.5.124:16100/todo/${TodoId}/task/${body.id}`, body)
  }


  //=================DELETE DATA METHOD
  deleteItem(Data: TodosApp) {
    return this.http.delete(`${this.JsonUrl}/${Data.id}`)
  }
  //=================DELETE DATA METHOD API
  deleteInnerListData(TodoId, body: TodosApp) {
    return this.http.delete(`http://10.10.5.124:16100/todo/${TodoId}/task/${body.id}`)
  }
}

//=================CLASS 
export class TodosApp {
  id?: number;
  name?: string;
  addedon: Date | string = new Date();
  tasks?: Array<TaskIteams> = new Array<TaskIteams>();
  // Ui
  isInput: boolean = false;
}
export class TaskIteams {
  id: number;
  todoId: number;
  isCompleted: boolean = false;
  name?: string;
}
