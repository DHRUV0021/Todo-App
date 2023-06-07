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
  editTodo: Todos;

  // Data Store
  allTodos: Array<Todos> = new Array<Todos>();

  // Toggle Btn
  panelOpenState = false;
  isResetBtn: boolean = false;
  isTodoEditBtnToggle: boolean = false;
  isTaskEditBtnToggle: boolean = false;

  searchValue: string;
  isLoading: Subject<boolean> = this._crud.isLoading;
  isTodoInput: boolean = false;

  constructor(private _crud: CrudsService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.Todo = new Todos;
    this.editTodo = new Todos;
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
  editData(todo: Todos) {
    this.allTodos.forEach((todo) => {
      todo.isInput = false;
      todo.isTodoInput = false;

      todo.tasks.forEach((task)=>{
        task.isTaskInput = false;
      })
    });
    
    this.editTodo = todo;
    if (todo.isTodoInput) {
      todo.isTodoInput = false;
    }
    else {
      todo.isTodoInput = true;
    }
  }

  /**
   * this method is used todos edit data reset
   * @param todo 
   */
  todoEditCancle(Todo) {
    this.Todo = new Todos;
    Todo.isTodoInput = false;
  }

  /**
   * This method is used edit todo 
   */
  updateTodo(todo) {
    this._crud.loaderShow();
    this._crud.editTodo(todo.id,this.editTodo).subscribe({
      next: (res) => {
        this.Todo = new Todos;
        todo.isTodoInput = false;
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
  updateTask(todoId) {
    this._crud.loaderShow();
    this._crud.editTask(todoId, this.editTasks).subscribe({
      next: (res) => {
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
  }

  /**
   * This method is used new singal task 
   * @param todo 
   */
  singleTaskAddToggle(todo) {
    this.allTodos.forEach((todo) => {
      todo.isInput = false;
      todo.isTodoInput = false;

      todo.tasks.forEach((task)=>{
        task.isTaskInput = false;
      })
    });
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
  editSingleTask(task) {
    this.allTodos.forEach((todo) => {
      todo.isInput = false;
      todo.isTodoInput = false;

      todo.tasks.forEach((task)=>{
        task.isTaskInput = false;
      })
    });
    this.editTasks = task;
    if (task.isTaskInput) {
      task.isTaskInput = false;
    }
    else {
      task.isTaskInput = true;
    }
  }

  /**
   * 
   * @param task this method use task edit cancle
   */
  editCancel(task) {
    this.editTasks = new Tasks;
    task.isTaskInput = false;
  }

  /**
   * this method is used checkBox Complete 
   * @param todoId 
   * @param task 
   */
  isTaskCompleted(todoId, task) {
    this._crud.loaderShow();
    this._crud.editTask(todoId, task).subscribe({
      next: (res) => {
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