import { Component } from '@angular/core';
import { FormGroup ,FormControl, ReactiveFormsModule, FormsModule, Validators } from "@angular/forms"

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  toDoForm: any

  constructor() {
    this.toDoForm = new FormGroup({

      'toDoInput': new FormControl('', Validators.required)
    })
  }
  inputValue: any

  establishTask() {
    this.inputValue = this.toDoForm.get('toDoInput').value
    console.log(this.inputValue)
  }
}
