import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./components/input/input.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { LocalStorageService } from "./services/local-storage.service";
import { ApiService } from "./services/api.service";
import { DeleteButtonsComponent } from "./components/delete-buttons/delete-buttons.component";
import { Task } from './types/interfaces/task.interface';
import {ToggleThemesComponent} from "./components/toggle-themes/toggle-themes.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, TodoListComponent, DeleteButtonsComponent, ToggleThemesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly localStorageService:LocalStorageService = inject(LocalStorageService)
  private readonly APIService:ApiService = inject(ApiService)

  public tasksArray!:Task[]

  ngOnInit():void {
    this.getTasks()
  }

  createTaskFromInput(inputValue:string):void {
    const taskFromInput:Task = {
      userId: 1,
      id: this.addIdToTask(),
      title: inputValue,
      completed: false
    }

    this.tasksArray.push(taskFromInput)
    this.localStorageService.updateLS(this.localStorageService.tasksArrayLSKey, this.tasksArray)
  }

  deleteTask(taskToDel:Task):void {
    this.tasksArray = this.tasksArray.filter((task:Task):boolean => task.id !== taskToDel.id)
    this.localStorageService.updateLS(this.localStorageService.tasksArrayLSKey, this.tasksArray)
  }

  changeTaskStatus (taskForChange:Task):void {
    const foundTask:Task = this.tasksArray.find((task:Task):boolean => task.id === taskForChange.id)!
    foundTask.completed = !foundTask.completed
    this.localStorageService.updateLS(this.localStorageService.tasksArrayLSKey, this.tasksArray)
  }

  private getTasks ():void {
    const tasks: Task[] | null = this.localStorageService.getDataFromLS(this.localStorageService.tasksArrayLSKey)
    if (tasks) {
      this.tasksArray = tasks
    } else {
      const tasks$:Observable<Task[]> = this.APIService.getTasks()
      tasks$.subscribe(serverTasks => this.tasksArray = serverTasks)
    }
  }

  private addIdToTask ():number {
    if (!this.tasksArray.length) {
      return 1
    } else {
      const lastTaskId:number = this.tasksArray[this.tasksArray.length - 1].id
      return lastTaskId + 1
    }
  }
}