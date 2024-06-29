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
  @Input({ required: true }) firstFiveServerTasks: Task[] | undefined = [];
  @Input() activeTasksArray:any
  @Input() compTasksArray:any
  
  localStorageService = inject(LocalStorageService)

  public compLSKey = this.localStorageService.doneTasksArrayLSKey
  private activeLSKey = this.localStorageService.activeTasksArrayLSKey

  constructor() {

  }

  clearActiveArray() {
    this.firstFiveServerTasks!.length = 0
    this.activeTasksArray.length = 0
    this.localStorageService.setTasksArrayInLS(this.activeLSKey, this.activeTasksArray)
  }

  clearCompArray() {
    this.compTasksArray.length = 0
    this.localStorageService.setTasksArrayInLS(this.compLSKey, this.compTasksArray)
  }

  clearAllTaskArrays() {
    this.clearActiveArray()
    this.clearCompArray()
  }

}
