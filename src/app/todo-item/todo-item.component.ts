import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() taskToDisplay:any

  @Output() markTaskAsCanceledEvent = new EventEmitter()
  @Output() markTaskAsDoneEvent = new EventEmitter()

  @Input() isCompleted:any

  markTaskAsCanceled() {
    this.markTaskAsCanceledEvent.emit(this.taskToDisplay)
  }

  markTaskAsDone() {
    this.markTaskAsDoneEvent.emit(this.taskToDisplay)
  }
}
