import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Task } from '../../types/interfaces/task.interface';


@Component({
  selector: 'app-todo-list',
  standalone: true,
    imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  @Input({required: true}) tasksArray:Task[] = []

  @Output() markTaskAsCanceledEvent:EventEmitter<Task> = new EventEmitter()
  @Output() markTaskAsCompEvent:EventEmitter<Task> = new EventEmitter()
  @Output() returnTaskFromCompEvent:EventEmitter<Task> = new EventEmitter()

  markTaskAsCancel(canceledTask:Task):void {
    this.markTaskAsCanceledEvent.emit(canceledTask)
  }

  markTaskAsComp(compTask:Task):void {
    this.markTaskAsCompEvent.emit(compTask)
  }

  returnTaskFromComp(returnTask:Task):void {
    this.returnTaskFromCompEvent.emit(returnTask)
  }

}
