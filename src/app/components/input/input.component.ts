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

  @Output() addTaskEvent:EventEmitter<string> = new EventEmitter<string>()

  readonly toDoForm: FormGroup

  constructor() {
    this.toDoForm = new FormGroup({
      'task': new FormControl('', Validators.required)
    })
  }

  addTask():void {
    const inputValue:string = this.toDoForm.value.task
    if (!this.isOnlySpace(inputValue)) {
      this.addTaskEvent.emit(inputValue)
      this.clearInput()
    } else {
      alert('The task is empty')
    }
  }

  private isOnlySpace(inputValue: string):boolean {
    if(inputValue.trim().length === 0) {
      this.clearInput()
      return true
    }
    return false
  }

  private clearInput():void {
    this.toDoForm.get('task')?.setValue('')
  }
}
