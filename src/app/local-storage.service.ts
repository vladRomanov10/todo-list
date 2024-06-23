import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setArrayInLS (tasksArray: any) {
    localStorage.setItem('tasks', tasksArray)
  }

  getArrayFromLS () {
    return localStorage.getItem('tasks')
  }
}
