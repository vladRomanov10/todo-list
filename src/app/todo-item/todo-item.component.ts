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

  @Input() isCompleted:any

  @Output() markAsDoneEvent = new EventEmitter()

  markAsDone () {
    this.markAsDoneEvent.emit()
  }
}
