import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {
  removeControl(rows: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  addControl(rows: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }

  JsonUrl="http://localhost:3000/Todos";//JSON URL

  constructor(private http:HttpClient) { }

  //=================GET DATA METHOD
  getItem(){
    return this.http.get<Array<TodosApp>>(this.JsonUrl);
  }

  //=================POST DATA METHOD
  AddItem(Data:TodosApp){
    return this.http.post(this.JsonUrl,Data);
  }

  //=================EDIT DATA METHOD
  editItem(Data:TodosApp){
    return this.http.put(`${this.JsonUrl}/${Data.id}`,Data);
  }

  deleteItem(Data:TodosApp){
    return this.http.delete(`${this.JsonUrl}/${Data.id}`)
  }

}


  //=================CLASS 
export class TodosApp{
  id?:number;
  TaskTitle?:string;
  TaskItem?:Array<TaskIteams> = new Array<TaskIteams>();
}

export class TaskIteams{
  Checkbox:boolean=false;
  TaskName?:string;
}
