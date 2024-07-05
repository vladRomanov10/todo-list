import { Injectable } from '@angular/core';
import { Task } from "../types/interfaces/task.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly lSKey:string = 'tasksArray'

  setTasksArrayInLS (tasksArray: Task[]):void {
    localStorage.setItem(this.lSKey, this.convertArrayToString(tasksArray))
  }


  getTasksArrayFromLS ():Task[] {
    const tasksArrayString:string | null = localStorage.getItem(this.lSKey)

    return tasksArrayString ? this.convertStringToArray(tasksArrayString) : []
  }

  private convertArrayToString (array: Task[]):string {
    return JSON.stringify(array)
  }

  private convertStringToArray (arrayInString: string):Task[] {
    return JSON.parse(arrayInString)
  }

}