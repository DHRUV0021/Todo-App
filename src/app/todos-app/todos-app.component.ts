import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudsService, TaskIteams, TodosApp } from '../cruds.service';

@Component({
  selector: 'app-todos-app',
  templateUrl: './todos-app.component.html',
  styleUrls: ['./todos-app.component.scss'],
})

export class TODOSAPPComponent {
  Task?: TodosApp;
  newItemAdd: TaskIteams;
  allList: Array<TodosApp> = new Array<TodosApp>();
  updateAddBtn: boolean = false;
  clearBtn: boolean = false;
  addNewListItemBtn: boolean = false;
  searchValue: String;
  addBtntodo = false;
  oneAdd = false;
  // INPUT SHOW AND HIDE
  showInputField: boolean = false;

  constructor(private Data: CrudsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Task = new TodosApp;
    this.Task.tasks = new Array<TaskIteams>();
    this.newItemAdd = new TaskIteams;
    this.addBlankItem();
    this.getTask();
  }

  /**
   *DYNAMIC ADD ROW IN TASKNOTE
   */
  addBlankItem() {
    this.Task.tasks.push(new TaskIteams());
  }

  /**
  *BY DEFAULT ONE LIST ITEM ADD INPUT
  */
  removeBlankitem(i) {
    if (this.Task.tasks.length != 1) {
      this.Task.tasks.splice(i, 1);
    }
  }

  /**
   * GET TASK MEHOD
   */
  getTask() {
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

  /**
   *ADD TODOS DATA METHOD
   */
  addTask() {
    if (this.Task.name) {
      this.Data.AddItem(this.Task).subscribe({
        next: (res) => {
          console.log(res);
          this.getTask();
          this.Task = new TodosApp;
          this.addBlankItem();
          this.toastr.success('Added New Task SuccessFully');
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

  addNewItemFill(data) {
    this.addNewListItemBtn = true;
    this.Task = data;
  }

  /**
   * ONLY TASK ITEM ADD METHOD
   */
  addFinalyItemData(id) {
    this.newItemAdd.todoId = id;
    let data = this.newItemAdd;
    this.addNewListItemBtn = false;

    this.Data.addInnerListData(id, data).subscribe({
      next: (res) => {
        this.getTask();
        this.newItemAdd = new TaskIteams;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /**
   * FILL INPUT DATA METHOD
   */
  fillData(Data: TodosApp) {
    this.Task = Data;
    this.updateAddBtn = true;
  }

  /**
   * EIDT TODOS DATA METHOD
   */
  editTask() {
    this.Data.editItem(this.Task).subscribe({
      next: (res) => {
        this.editInnerlist(this.Task.id);
        this.addBlankItem();
        this.Task = new TodosApp;
        this.updateAddBtn = false;
        console.log(res);
        this.toastr.success('To-do Update Successfully...');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /**
   * EIDT TODOS ITEM DATA METHOD
   */
  editInnerlist(TodoId) {
    this.Task.tasks.forEach(element => {
      this.Data.editInnerListData(TodoId, element).subscribe({
        next: (res) => {
          console.log(res);
          this.updateAddBtn = false;
          this.Task = new TodosApp;
          this.getTask();
          this.addBlankItem();
          // this.toastr.success('Edit New Item Success');
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  /**
   * TODOS DELETE METHOD
   * 
   */
  deleteTask(Data: TodosApp) {
    this.Data.deleteItem(Data).subscribe({
      next: (res) => {
        console.log(res);
        this.getTask();
        this.toastr.success('Task Deleted Syccessfully');
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  /**
   * TODOS ITEM DELETE METHOD
   * 
   */
  deleteInnerList(TodoId, body) {
    this.Data.deleteInnerListData(TodoId, body).subscribe({
      next: (res) => {
        console.log(res);
        this.getTask();
        this.toastr.success('Item Deleted Syccessfully');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("delete new list Item");
      }
    })
  }

  /**
   * TODO & TASK SEARCH DATA METHOD
   */
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
        this.getTask();
      }
    }
    else {
      this.getTask();
    }
  }

  /**
   * EDIT FILD RESET METHOD
   */
  reseteditData() {
    this.Task = new TodosApp;
    this.clearBtn = true;
    this.updateAddBtn = false;
    this.addNewListItemBtn = false;
    this.addBlankItem();
  }

  // card new data ADD
  toggleInputField(item) {
    if (!this.showInputField) {
      item.isInput = true;
    }
  }
} 