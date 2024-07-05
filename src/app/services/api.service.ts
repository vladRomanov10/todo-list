import { Injectable } from '@angular/core';
import { Task } from '../types/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly serverLink:string = 'https://jsonplaceholder.typicode.com/todos/'

  async getServerTasks (): Promise<Task[]> {
    try {
      const serverTasks: Task[] = await this.serverRequest(this.serverLink)
      return serverTasks.slice(0, 5)
    } catch (error:unknown) {
      alert('Sorry, something went wrong')
      return []
    }
  }

  private async serverRequest(url:string):Promise<Task[]> {
    const res:Response = await fetch(url)
    return await res.json()
  }
}
