import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  activeTasksArrayLSKey = 'activeTasks'
  doneTasksArrayLSKey = 'doneTasks'

  convertArrayToString (array: any) {
    return JSON.stringify(array)
  }

  convertStringToArray (string: any) {
    return JSON.parse(string)
  }

  setTasksArrayInLS (LSKey: any, tasksArray: any) {
    localStorage.setItem(LSKey, this.convertArrayToString(tasksArray))
  }

  setDoneTasksArrayInLS (tasksArray: any) {
    localStorage.setItem('doneTasks', this.convertArrayToString(tasksArray))
  }

  getTasksArrayFromLS (LSKey: any) {
    const tasksArrayString = localStorage.getItem(LSKey)

    return tasksArrayString ? this.convertStringToArray(tasksArrayString) : []
  }

}
