import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./input/input.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import {LocalStorageService} from "./local-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  localStorageService = inject(LocalStorageService)

  activeTasksArray: any[] = []

  doneTasksArray:any[] = []

  activeLSKey = this.localStorageService.activeTasksArrayLSKey
  doneLSKey = this.localStorageService.doneTasksArrayLSKey

  ngOnInit() {
    this.activeTasksArray = this.localStorageService.getTasksArrayFromLS(this.activeLSKey)
    this.doneTasksArray = this.localStorageService.getTasksArrayFromLS(this.doneLSKey)
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
