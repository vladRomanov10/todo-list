import { Injectable } from '@angular/core';
import { Task } from "../types/interfaces/task.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  readonly tasksArrayLSKey:string = 'tasksArray'
  readonly themeModeLSKey:string = 'themeMode'

  setDataInLS<T>(data:T, lSKey:string):void {
    localStorage.setItem(lSKey, this.convertDataToString(data))
  }

  setTasksArrayInLS (tasksArray: Task[]):void {
    localStorage.setItem(this.tasksArrayLSKey, this.convertArrayToString(tasksArray))
  }

  getTasksArrayFromLS ():Task[] | null {
    const tasksArrayString:string | null = localStorage.getItem(this.tasksArrayLSKey)

    return tasksArrayString ? this.convertStringToArray(tasksArrayString) : null
  }

  getDataFromLS<T>(lSKey:string):T | null {
    const dataInString:string | null = localStorage.getItem(lSKey)
    return dataInString ? this.convertStringToData(dataInString) : null
  }

  clearLS(lSKey:string):void {
    localStorage.removeItem(lSKey)
  }

  private convertArrayToString (array: Task[]):string {
    return JSON.stringify(array)
  }

  private convertDataToString<T>(data:T):string {
    return JSON.stringify(data)
  }

  private convertStringToArray (arrayInString: string):Task[] {
    return JSON.parse(arrayInString)
  }

  private convertStringToData<T>(dataInString: string):T {
    return JSON.parse(dataInString)
  }
}