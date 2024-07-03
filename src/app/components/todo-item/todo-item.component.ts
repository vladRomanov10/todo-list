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
    userId: 0,
    id: 0,
    title: '',
    completed: false
  }

  @Output() markTaskAsCanceledEvent = new EventEmitter()
  @Output() markTaskAsCompEvent = new EventEmitter()


  markTaskAsCanceled() {
    this.markTaskAsCanceledEvent.emit(this.taskToDisplay)
  }

  markTaskAsComp() {
    this.markTaskAsCompEvent.emit(this.taskToDisplay)
  }
}
