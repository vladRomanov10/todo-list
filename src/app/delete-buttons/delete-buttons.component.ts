import { Component, Input, inject } from '@angular/core';
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-delete-buttons',
  standalone: true,
  imports: [],
  templateUrl: './delete-buttons.component.html',
  styleUrl: './delete-buttons.component.scss'
})
export class DeleteButtonsComponent {

  localStorageService = inject(LocalStorageService)

  activeLSKey = this.localStorageService.activeTasksArrayLSKey
  compLSKey = this.localStorageService.doneTasksArrayLSKey

  @Input() activeTasksArray:any
  @Input() compTasksArray:any

  clearActiveArray() {
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
