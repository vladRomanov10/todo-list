import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { Task } from '../../types/interfaces/task.interface';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() taskToDisplay: Task = {
    id: 0,
    title: '',
    status: 'TODO'
  }

  @Output() markTaskAsCanceledEvent = new EventEmitter()
  @Output() markTaskAsCompEvent = new EventEmitter()

  @Input() isCompleted:any

  markTaskAsCanceled() {
    this.markTaskAsCanceledEvent.emit(this.taskToDisplay)
  }

  markTaskAsComp() {
    this.markTaskAsCompEvent.emit(this.taskToDisplay)
  }
}
