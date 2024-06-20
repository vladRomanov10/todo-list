import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms"
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TodoListComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  toDoForm: any

  constructor() {
    this.toDoForm = new FormGroup({
      'task': new FormControl('', Validators.required)
    })
  }

  @Output() addTaskEvent = new EventEmitter()

  addTask(value:any) {
    this.addTaskEvent.emit(value)
  }
}
