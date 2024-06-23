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

  tasksArray: any[] = []

  pushTaskInArray(value:any) {
    this.tasksArray.push(value)
    this.localStorageService.setArrayInLS(this.tasksArray)
  }

  deleteTask(taskName:any) {
    this.tasksArray = this.tasksArray.filter((task) => task !== taskName)
  }
}
