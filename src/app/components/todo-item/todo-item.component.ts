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

  @Input({required: true}) taskToDisplay: Task = {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  }

  @Output() markTaskAsCanceledEvent:EventEmitter<Task> = new EventEmitter()
  @Output() markTaskAsCompEvent:EventEmitter<Task> = new EventEmitter()


  markTaskAsCancel():void {
    this.markTaskAsCanceledEvent.emit(this.taskToDisplay)
  }

  markTaskAsComp():void {
    this.markTaskAsCompEvent.emit(this.taskToDisplay)
  }
}