import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudsService, Tasks, Todos } from '../Service/cruds.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todos-app',
  templateUrl: './todos-app.component.html',
  styleUrls: ['./todos-app.component.scss'],
})

export class TodosComponent {

  // Data Binding
  todoDetails: Todos;
  taskDetails: Tasks;

  // Data Store
  allTodos: Array<Todos> = new Array<Todos>();

  // Toggle Btn
  updateAddBtn: boolean = false;
  resetBtn: boolean = false;
  taskEditBtnToggle: boolean = false;

  searchValue: string;

  constructor(private _crud:CrudsService, private _toastr: ToastrService) { }

  isLoading: Subject<boolean> = this._crud.isLoading;

  ngOnInit(): void {

    this.todoDetails = new Todos;
    this.taskDetails = new Tasks;

    this.todoDetails.tasks = new Array<Tasks>();

    this.addBlankItem();
    this.getTodos();
  }

  /**
   *This method is used dynamic add row 
   */
  addBlankItem() {
    this.todoDetails.tasks.push(new Tasks());
  }

  /**
   * This method is used add list item by default one input box 
   * @param i 
   */
  removeBlankitem(i) {
    if (this.todoDetails.tasks.length != 1) {
      this.todoDetails.tasks.splice(i, 1);
    }
  }

  /**
   * This method is used get todo
   */
  getTodos() {
    this._crud.loaderShow();
    this._crud.getTodos().subscribe({
      next: (res) => {
        this.allTodos = res;
      },
      error: (err) => {
        this._toastr.error(err);
        this._crud.loaderShow();
      },
      complete: () => {
        this._crud.loaderHide();
      }
    })
  }

  /**
   *This method is used add todos 
   */
  addTodo() {
    this._crud.loaderShow();
    if (this.todoDetails.name) {
      this._crud.addTodo(this.todoDetails).subscribe({
        next: (res) => {
          this.todoDetails = new Todos;
          this.getTodos();
          this.addBlankItem();
          this._toastr.success('Added New Todo SuccessFully...');
        },
        error: (err) => {
          this._toastr.error(err);
          this._crud.loaderShow();
        },
        complete: () => {
          this._crud.loaderHide();
        }
      })
    }
    else {
      this._toastr.warning('plese enter your Todo');
    }
  }

  /**
   * This method is used  task add
   * @param todoId 
   */
  addTask(todoId) {
    this._crud.loaderShow();
    this.taskDetails.todoId = todoId;

    this._crud.addTask(todoId, this.taskDetails).subscribe({
      next: (res) => {
        this.taskDetails = new Tasks;
        this.getTodos();
      },
      error: (err) => {
        this._toastr.error(err);
        this._crud.loaderShow();
      },
      complete: () => {
        this._crud.loaderHide();
      }
    })
  }

  /**
   * This method is used todo Fill  
   * @param todo 
   */
  fillData(todo: Todos) {
    this.todoDetails = todo;
    this.updateAddBtn = true;
  }

  /**
   * This method is used edit todo 
   */
  editTodo() {
    this._crud.loaderShow();
    this._crud.editTodo(this.todoDetails).subscribe({
      next: (res) => {
        this.editTask(this.todoDetails.id);
        this.addBlankItem();
        this.todoDetails = new Todos;
        this.updateAddBtn = false;
        this._toastr.success('Todo Update Successfully...');
      },
      error: (err) => {
        this._toastr.error(err);
        this._crud.loaderShow();
      },
      complete: () => {
        this._crud.loaderHide();
      }
    })
  }

  /**
   * This method is used edit todo task 
   * @param todoId 
   */
  editTask(todoId) {
    this._crud.loaderShow();
    this.todoDetails.tasks.forEach(task => {
      this._crud.editTask(todoId, task).subscribe({
        next: (res) => {
          this.updateAddBtn = false;
          this.todoDetails = new Todos;
          this.getTodos();
          this.addBlankItem();
          this._toastr.success(' Task Update Successfully...');
        },
        error: (err) => {
          this._toastr.error(err);
          this._crud.loaderShow();
        },
        complete: () => {
          this._crud.loaderHide();
        }
      });
    });
  }

  /**
   * This method is used todo delete
   * @param todo 
   */
  deleteTodo(todo:Todos) {
    this._crud.loaderShow();
    this._crud.deleteTodo(todo).subscribe({
      next: (res) => {
        this.getTodos();
        this._toastr.success('Todo Deleted Successfully...!');
      },
      error: (err) => {
        this._toastr.error(err);
        this._crud.loaderShow();
      },
      complete: () => {
        this._crud.loaderHide();
      }
    })
  }

  /**
   * This method is used todo task delete
   * @param todoId 
   * @param task 
   */
  deleteTask(todoId, task) {
    this._crud.loaderShow();
    this._crud.deleteTask(todoId, task).subscribe({
      next: (res) => {
        this.getTodos();
        this._toastr.success('Task Deleted successfully...');
      },
      error: (err) => {
        this._toastr.error(err);
        this._crud.loaderShow();
      },
      complete: () => {
        this._crud.loaderHide();
      }
    })
  }

  /**
   *This method is used todo & task search  
   */
  typeSearchData() {
    if (this.searchValue) {
      let tempTodos = new Array<Todos>();
      if (this.allTodos.length > 0) {
        for (let todo of this.allTodos) {
          if (JSON.stringify(todo).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            tempTodos.push(todo)
          }
        }
        this.allTodos = tempTodos;
      }
      else {
        this.getTodos();
      }
    }
    else {
      this.getTodos();
    }
  }

  /**
   *This Method Is Used reset data 
   */
  reseteditData() {
    this.todoDetails = new Todos;
    this.resetBtn = true;
    this.updateAddBtn = false;
    this.addBlankItem();
  }

  /**
   * This method is used new singal task 
   * @param todo 
   */
  singleTaskAddToggle(todo) {
    if (todo.isInput) {
      todo.isInput = false;
      this.taskDetails = new Tasks;
      this.taskEditBtnToggle = true;

    }
    else {
      todo.isInput = true;
      this.taskEditBtnToggle = true;
    }
  }


  /**
   *  This method is used  task fill task 
   * @param todo 
   * @param task 
   */
  fillSingleTask(todo, task) {
    this.taskDetails = task;
    if (todo.isInput) {
      todo.isInput = false;
      this.taskEditBtnToggle = true;
    }
    else {
      todo.isInput = true;
      this.taskEditBtnToggle = false;
    }
  }
  /**
   * This method is used  singal edit task 
   * @param todoId 
   */
  singalEditTask(todoId) {
    this.taskDetails.todoId = todoId;
    this._crud.editTask(todoId, this.taskDetails).subscribe({
      next: (res) => {
        this.taskDetails = new Tasks;
        this.taskEditBtnToggle = true;
      },
      error: (err) => {
        this._toastr.error(err);
      }
    })
  }





}