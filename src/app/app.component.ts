import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./input/input.component";
import { TodoListComponent } from "./todo-list/todo-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  tasksArray: any[] = []

  isCompleted: any = false

  pushTaskInArray(value:any) {
    this.tasksArray.push(value)
  }

  markAsDone () {
    this.isCompleted = !this.isCompleted
  }
}
