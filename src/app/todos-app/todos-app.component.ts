import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudsService, TaskIteams, TodosApp } from '../cruds.service';

@Component({
  selector: 'app-todos-app',
  templateUrl: './todos-app.component.html',
  styleUrls: ['./todos-app.component.scss'],
})

export class TODOSAPPComponent {
  deleteItem(mockRespnoses: { date: string; TaskItem: { Checkbox: boolean; TaskName: string; }[]; TaskTitle: string; id: number; }[]) {
    throw new Error('Method not implemented.');
  }

  Task?: TodosApp;
  allList: Array<TodosApp> = new Array<TodosApp>();
  updateAddBtn: boolean = false;
  clearBtn: boolean = false;
  searchValue: String;

  constructor(private Data: CrudsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Task = new TodosApp;
    this.Task.TaskItem = new Array<TaskIteams>();
    this.addBlankItem();
    this.getData();
  }


  //DYNAMIC ADD ROW
  addBlankItem() {
    this.Task.TaskItem.push(new TaskIteams());
  }

  removeBlankitem(i) {
    if (this.Task.TaskItem.length != 1) {
      this.Task.TaskItem.splice(i, 1);
    }
  }

  //=================GET DATA METHOD
  getData() {
    this.Data.getItem().subscribe({
      next: (res) => {
        this.allList = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("data get success");
      }
    })
  }

  //=================ADD DATA METHOD
  AddData() {
    if (this.Task.TaskTitle) {
      this.Data.AddItem(this.Task).subscribe({
        next: (res) => {
          console.log(res);
          this.getData();
          this.Task = new TodosApp;
          this.addBlankItem();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("success full");
        }
      })
    }
    else {
      this.toastr.warning('plese enter your task');
    }
  }

  //=================EDIT DATA METHOD
  fillData(Data: TodosApp) {
    this.Task = Data;
    this.updateAddBtn = true;
  }

  editData() {
    this.Data.editItem(this.Task).subscribe({
      next: (res) => {
        this.Task = new TodosApp;
        this.updateAddBtn = false;
        this.addBlankItem();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("EDIT DATA");
      }
    })
  }

  //=================DELETE DATA METHOD
  deleteData(Data: TodosApp) {
    this.Data.deleteItem(Data).subscribe({
      next: (res) => {
        console.log(res);
        this.getData();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toastr.success('Task Deleted Syccessfully');
      }
    })
  }

  //================= SEARCH DATA METHOD
  typeSearchData() {
    if (this.searchValue) {
      let searchEmploye = new Array<TodosApp>();
      if (this.allList.length > 0) {
        for (let emp of this.allList) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchEmploye.push(emp)
          }
        }
        this.allList = searchEmploye;
      }
      else {
        this.getData();
      }
    }
    else {
      this.getData();
    }
  }

  //================= EDIT CLEAR FILD DATA METHOD
  editclear() {
    this.Task = new TodosApp;
    this.clearBtn = true;
    this.updateAddBtn = false;
    this.addBlankItem();
  }

} 