import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() tasksArray:any[] = []

  @Input() doneTasksArray:any[] = []

  @Output() markTaskAsCanceledEvent = new EventEmitter()
  @Output() markTaskAsDoneEvent = new EventEmitter()

  markTaskAsCanceled(taskName:any) {
    this.markTaskAsCanceledEvent.emit(taskName)
  }

  markTaskAsDone(taskName:any) {
    this.markTaskAsDoneEvent.emit(taskName)
  }
}
