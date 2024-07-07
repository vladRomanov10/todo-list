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

  private readonly localStorageService:LocalStorageService = inject(LocalStorageService)
  private readonly APIService:ApiService = inject(ApiService)

  public tasksArray:Task[] = []

  ngOnInit():void {
    this.getTasks()
  }

  createTaskFromInput(inputValue:string):void {
    const taskFromInput:Task = {
      userId: 1,
      id: 0,
      title: inputValue,
      completed: false
    }
    this.tasksArray.push(taskFromInput)
    this.tasksArray = this.addId(this.tasksArray)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  changeTaskStatus (taskForChange:Task):void {
    const foundTask:Task = this.tasksArray.find((task:Task):boolean => taskForChange.id === task.id)!
    foundTask.completed = !foundTask.completed
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  deleteTask(taskToDel:Task):void {
    this.tasksArray = this.tasksArray.filter((task:Task):boolean => task.id !== taskToDel.id)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  private async getTasks ():Promise<void> {

    const lSTasks:Task[] = this.localStorageService.getTasksArrayFromLS()

    this.tasksArray = lSTasks

    //Настройка, если LS пустой, то грузятся таски с сервера
    if(lSTasks.length === 0) {
      this.tasksArray = await this.APIService.getServerTasks()
    }
  }

  private addId (tasksArray:Task[]):Task[] {
    return tasksArray.map((task:Task, index:number):Task => ({...task, id: index + 1}))
  }

}

