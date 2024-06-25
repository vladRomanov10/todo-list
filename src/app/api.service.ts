import { Injectable } from '@angular/core';

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

  async getServerTasks () {
    try {
      const serverTasks = await this.serverRequest(this.serverLink)
      for (let i = 0; i < 5; i++) {
        this.firstFiveServerTasks.push(serverTasks[i].title)
      }
    } catch (error) {
      alert('Sorry, something went wrong')
    }
  }
}
