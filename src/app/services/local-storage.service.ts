import { Injectable } from '@angular/core';
import { Task } from "../types/interfaces/task.interface";
import {Mode} from "../types/interfaces/theme-mode";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  readonly tasksArrayLSKey:string = 'tasksArray'
  readonly themeModeLSKey:string = 'themeMode'

  setDataInLS<T>(lSKey:string, data:T):void {
    localStorage.setItem(lSKey, this.convertDataToString(data))
  }

  getDataFromLS<T>(lSKey:string):T | null {
    const dataInString:string | null = localStorage.getItem(lSKey)
    return dataInString ? this.convertStringToData(dataInString) : null
  }

  updateLS(lSKey:string, data:Task[] | Mode):void {
    if (data.length === 0) {
      this.clearLS(lSKey)
    } else {
      this.setDataInLS(lSKey, data)
    }
  }

  clearLS(lSKey:string):void {
    localStorage.removeItem(lSKey)
  }

  private convertDataToString<T>(data:T):string {
    return JSON.stringify(data)
  }

  private convertStringToData<T>(dataInString: string):T {
    return JSON.parse(dataInString)
  }
}