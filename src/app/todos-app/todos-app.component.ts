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
  Todo: Todos;
  Task: Tasks;
  editTasks: Tasks;

  // Data Store
  allTodos: Array<Todos> = new Array<Todos>();

  // Toggle Btn
  isUpdateAddBtn: boolean = false;
  isResetBtn: boolean = false;
  isTaskEditBtnToggle: boolean = false;

  searchValue: string;
  isLoading: Subject<boolean> = this._crud.isLoading;

  constructor(private _crud: CrudsService, private _toastr: ToastrService) { }

  ngOnInit(): void {

    this.Todo = new Todos;
    this.Task = new Tasks;
    this.editTasks = new Tasks;
    this.Todo.tasks = new Array<Tasks>();
    this.fetchTodos();
  }

  /**
   * This method is used get todo
   */
  fetchTodos() {
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
    if (this.Todo.name) {
      this._crud.addTodo(this.Todo).subscribe({
        next: (res) => {
          this.Todo = new Todos;
          this.fetchTodos();
          this._toastr.success('Added New Todo SuccessFully...!');
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
      this._toastr.warning('Plese Enter Your Todo...?');
    }
  }

  /**
   * This method is used  task add
   * @param todoId 
   */
  addTask(todoId) {
    this._crud.loaderShow();
    this.Task.todoId = todoId;

    this._crud.addTask(todoId, this.Task).subscribe({
      next: (res) => {
        this.Task = new Tasks;
        this.fetchTodos();
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
    this.Todo = todo;
    this.isUpdateAddBtn = true;
  }

  /**
   * This method is used edit todo 
   */
  editTodo() {
    this._crud.loaderShow();
    this._crud.editTodo(this.Todo).subscribe({
      next: (res) => {
        this.editTask(this.Todo.id);
        this.Todo = new Todos;
        this.isUpdateAddBtn = false;
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
    this._crud.editTask(todoId, this.editTasks).subscribe({
      next: (res) => {
        this.isUpdateAddBtn = false;
        this.Todo = new Todos;
        this.fetchTodos();
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
  }

  /**
   * This method is used todo delete
   * @param todo 
   */
  deleteTodo(todo: Todos) {
    this._crud.loaderShow();
    this._crud.deleteTodo(todo).subscribe({
      next: (res) => {
        this.fetchTodos();
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
        this.fetchTodos();
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
        this.fetchTodos();
      }
    }
    else {
      this.fetchTodos();
    }
  }

  /**
   *This Method Is Used reset data 
   */
  reseteditData() {
    this.Todo = new Todos;
    this.isResetBtn = true;
    this.isUpdateAddBtn = false;
  }

  /**
   * This method is used new singal task 
   * @param todo 
   */
  singleTaskAddToggle(todo) {
    if (todo.isInput) {
      todo.isInput = false;
      this.Task = new Tasks;
      this.isTaskEditBtnToggle = true;

    }
    else {
      todo.isInput = true;
      this.isTaskEditBtnToggle = true;
    }
  }

  /**
   *  This method is used  task fill task 
   * @param todo 
   * @param task 
   */
  fillSingleTask(task) {
    this.editTasks = task;
    if (task.isTaskInput) {
      task.isTaskInput = false;
    }
    else {
      task.isTaskInput = true;
    }
  }

  editCancel(task) {
    this.editTasks = new Tasks;
    task.isTaskInput = false;
  }

  isTaskCompleted(todoId, task) {
    this._crud.loaderShow();
    this._crud.editTask(todoId, task).subscribe({
      next: (res) => {
        this.isUpdateAddBtn = false;
        this.isTaskEditBtnToggle = false;
        this.Todo = new Todos;
        this.Task = new Tasks;
        this.fetchTodos();
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });
  }

  /**
   * This method is used  singal edit task 
   * @param todoId 
   */
  singalEditTask(todoId) {
    this.Task.todoId = todoId;
    this._crud.editTask(todoId, this.Task).subscribe({
      next: (res) => {
        this.Task = new Tasks;
        this.isTaskEditBtnToggle = true;
      },
      error: (err) => {
        this._toastr.error(err);
      }
    })
  }

};