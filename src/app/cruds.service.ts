import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

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
