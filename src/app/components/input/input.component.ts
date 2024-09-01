import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms"

import { TodoListComponent } from "../todo-list/todo-list.component";
import { AppThemeServiceService } from "../../services/app-theme-service.service";

import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {Mode} from "../../types/interfaces/theme-mode";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TodoListComponent, NgOptimizedImage, AsyncPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Output() addTaskEvent:EventEmitter<string> = new EventEmitter<string>()

  private readonly appThemeService= inject(AppThemeServiceService)

  readonly currentMode$:BehaviorSubject<Mode> = this.appThemeService.currentMode$

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
