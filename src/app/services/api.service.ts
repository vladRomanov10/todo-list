import { Injectable } from '@angular/core';
import { Task } from '../types/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverLink:any = 'https://jsonplaceholder.typicode.com/todos/'
  firstFiveServerTasks: any[] = []

  async serverRequest(url:any) {
    const res = await fetch(url)
    return await res.json()
  }

  async getServerTasks (): Promise<Task[] | undefined> {
    try {
      const serverTasks: Task[] = await this.serverRequest(this.serverLink)
      return serverTasks.slice(0, 5)
    } catch (error) {
      alert('Sorry, something went wrong')
      return undefined
    }
  }
}
