import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { ToastrService } from 'ngx-toastr';
import { CrudsService, TaskIteams, TodosApp } from '../cruds.service';


@Component({
  selector: 'app-todos-app',
  templateUrl: './todos-app.component.html',
  styleUrls: ['./todos-app.component.scss']
})
export class TODOSAPPComponent {
  
  Task?:TodosApp;
  allList : Array<TodosApp>  = new Array<TodosApp>();

  constructor(private Data:CrudsService ,private toastr: ToastrService ) {}

  ngOnInit(): void {  
      this.Task = new TodosApp;
      this.Task.TaskItem  = new Array<TaskIteams>();
      this.addBlankItem();
      this.getData();
  }  
//DYNAMIC ADD ROW
  addBlankItem(){
      this.Task.TaskItem.push(new TaskIteams());
  }

  removeBlankitem(i){
    if(this.Task.TaskItem.length != 1){
      this.Task.TaskItem.splice(i, 1);
    }
  }

  AddData(){
    if(this.Task){
    this.Data.AddItem(this.Task).subscribe({
      next:(res)=>{
        console.log(res);
        this.getData();
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("success full");
      }
    })
  }
  else{
    console.log("plese ENter your task");
  }
  }
  
  getData(){
    this.Data.getItem().subscribe({
      next:(res)=>{
        this.allList = res;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("data get success");
      }
    })
  }





} 