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

  @Input() firstFiveServerTasks:Task[] | undefined = []
  @Input() activeTasksArray:any[] = []
  @Input() compTasksArray:any[] = []

  @Output() markTaskAsCanceledEvent = new EventEmitter()
  @Output() markTaskAsCompEvent = new EventEmitter()

  markTaskAsCanceled(taskName:any) {
    this.markTaskAsCanceledEvent.emit(taskName)
  }

  markTaskAsComp(taskName:any) {
    this.markTaskAsCompEvent.emit(taskName)
  }
}
