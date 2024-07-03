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

  localStorageService = inject(LocalStorageService)

  private readonly lSKey = this.localStorageService.lSKey

  clearActiveTasks():void {
    this.tasksArray = this.tasksArray.filter((task:Task):boolean => task.completed)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  clearCompTasks():void {
    this.tasksArray = this.tasksArray.filter((task:Task):boolean => !task.completed)
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }

  clearAllTasks():void {
    this.tasksArray.length = 0
    this.localStorageService.setTasksArrayInLS(this.tasksArray)
  }
}

