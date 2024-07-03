import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./components/input/input.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { LocalStorageService } from "./services/local-storage.service";
import { ApiService } from "./services/api.service";
import { DeleteButtonsComponent } from "./components/delete-buttons/delete-buttons.component";
import { Task } from './types/interfaces/task.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, TodoListComponent, DeleteButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  ngOnInit() {
    this.getTasks()
  }

  localStorageService = inject(LocalStorageService)
  APIService = inject(ApiService)

  tasksArray:Task[] = []

  lsKey:string = this.localStorageService.lSKey

  async getTasks () {
    const firstFiveServerTasks: Task[] = await this.APIService.getServerTasks()

    const lSTasks:Task[] = this.localStorageService.getTasksArrayFromLS()

    this.tasksArray = firstFiveServerTasks.concat(lSTasks)
  }

  addId (tasksArray:Task[]):Task[] {
    return tasksArray.map((task:Task, index:number):Task => ({...task, id: index + 1}))
  }

  pushActiveTaskInArray(taskTitle:string) {
    const taskFromInput:Task = {
      userId: 1,
      id: 0,
      title: taskTitle,
      completed: false
    }
    this.tasksArray.push(taskFromInput)
    this.tasksArray = this.addId(this.tasksArray)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  changeTaskStatus (taskForChange:Task) {
    const foundTask:Task | undefined = this.tasksArray.find((task:Task) => taskForChange.id ===task.id)
    if (foundTask) {
      foundTask.completed = true
    } else {
      return
    }
  }

  markTaskAsComp (compTask:Task) {
    
  }

  deleteTask(taskToDel:Task):void {
    this.tasksArray = this.tasksArray.filter((task:Task):boolean => task.id !== taskToDel.id)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }
}

