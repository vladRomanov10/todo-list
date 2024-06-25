import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./input/input.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import {LocalStorageService} from "./local-storage.service";
import { ApiService } from "./api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  ngOnInit() {
    this.getTasks()
  }

  localStorageService = inject(LocalStorageService)
  APIService = inject(ApiService)

  activeTasksArray: any[] = []
  doneTasksArray:any[] = []

  activeLSKey = this.localStorageService.activeTasksArrayLSKey
  doneLSKey = this.localStorageService.doneTasksArrayLSKey

  async getTasks () {
    await this.APIService.getServerTasks()

    const firstFiveServerTasks:any = this.APIService.firstFiveServerTasks
    const activeLSTasks:any = this.localStorageService.getTasksArrayFromLS(this.activeLSKey)
    const doneLSTasks:any = this.localStorageService.getTasksArrayFromLS(this.doneLSKey)

    this.activeTasksArray = [...firstFiveServerTasks, ...activeLSTasks]
    this.doneTasksArray = doneLSTasks
  }

  pushActiveTaskInArray(taskName:any) {
    this.activeTasksArray.push(taskName)
    this.localStorageService.setTasksArrayInLS(this.activeLSKey, this.activeTasksArray)
  }

  pushDoneTaskInArray(taskName:any) {
    this.doneTasksArray.push(taskName)
    this.localStorageService.setTasksArrayInLS(this.doneLSKey, this.doneTasksArray)
    this.deleteTask(taskName)
  }

  deleteTask(taskName:any) {
    this.activeTasksArray = this.activeTasksArray.filter((task) => task !== taskName)
    this.localStorageService.setTasksArrayInLS(this.activeLSKey, this.activeTasksArray)
  }
}
