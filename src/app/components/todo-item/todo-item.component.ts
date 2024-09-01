import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";

import { Task } from '../../types/interfaces/task.interface';

import { AppThemeServiceService } from "../../services/app-theme-service.service";
import {BehaviorSubject} from "rxjs";
import {Mode} from "../../types/interfaces/theme-mode";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Input({required: true}) taskToDisplay!: Task

  @Output() markTaskAsCanceledEvent:EventEmitter<Task> = new EventEmitter<Task>()
  @Output() markTaskAsCompEvent:EventEmitter<Task> = new EventEmitter<Task>()
  @Output() returnTaskFromCompEvent:EventEmitter<Task> = new EventEmitter<Task>()

  private readonly appThemeService= inject(AppThemeServiceService)

  readonly currentMode$:BehaviorSubject<Mode> = this.appThemeService.currentMode$

  markTaskAsCancel():void {
    this.markTaskAsCanceledEvent.emit(this.taskToDisplay)
  }

  markTaskAsComp():void {
    this.markTaskAsCompEvent.emit(this.taskToDisplay)
  }

  returnTaskFromComp():void {
    this.returnTaskFromCompEvent.emit(this.taskToDisplay)
  }
}