import { Component } from '@angular/core';
import { FormGroup ,FormControl, ReactiveFormsModule, FormsModule} from "@angular/forms"
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

  tasksArray: any[] = []

  constructor() {
    this.toDoForm = new FormGroup({

      'toDoInput': new FormControl(null)
    })
  }

  establishTask() {
    const inputValue = this.toDoForm.get('toDoInput').value

    this.tasksArray.push(inputValue)

    this.clearInputValue()

    console.log(this.tasksArray)
  }

  clearInputValue() {
    this.toDoForm.patchValue({toDoInput: null})
  }
}
