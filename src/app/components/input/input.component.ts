import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms"
import { TodoListComponent } from "../todo-list/todo-list.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-input',
  standalone: true,
    imports: [ReactiveFormsModule, FormsModule, TodoListComponent, NgOptimizedImage],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Output() addTaskEvent:EventEmitter<string> = new EventEmitter()

  readonly toDoForm: FormGroup

  constructor() {
    this.toDoForm = new FormGroup({
      'task': new FormControl('', Validators.required)
    })
  }

  addTask():void {
    const inputValue:string = this.toDoForm.value.task
    if (this.isOnlySpace(inputValue)) {
      alert('The task is empty')
      this.toDoForm.get('task')?.setValue('')
      return
    }
    this.addTaskEvent.emit(inputValue)
    this.toDoForm.get('task')?.setValue('')
  }

  private isOnlySpace(inputValue: string):boolean {
    return inputValue.trim().length === 0
  }
}
