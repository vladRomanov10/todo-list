import { Component, Input, inject } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import { Task } from '../../types/interfaces/task.interface';

@Component({
  selector: 'app-delete-buttons',
  standalone: true,
  imports: [],
  templateUrl: './delete-buttons.component.html',
  styleUrl: './delete-buttons.component.scss'
})
export class DeleteButtonsComponent {

  @Input() tasksArray:Task[] = []

  checkTaskArray () {
    console.log(this.tasksArray)
  }

  localStorageService = inject(LocalStorageService)

  cycleForClearTasks(tasksArray:Task[], isComp:boolean):void {
    for (let i = tasksArray.length - 1; i >= 0; i--) {
      if (!isComp) {
        if (!this.tasksArray[i].completed) {
          this.tasksArray.splice(i, 1)
        }
      }
      if (isComp) {
        if (this.tasksArray[i].completed) {
          this.tasksArray.splice(i, 1)
        }
      }
    }
  }

  clearActiveTasks():void {
    this.cycleForClearTasks(this.tasksArray, false)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  clearCompTasks():void {
    this.cycleForClearTasks(this.tasksArray, true)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  clearAllTasks(): void {
    this.tasksArray.length = 0
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }
}