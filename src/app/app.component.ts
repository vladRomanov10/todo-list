import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./components/input/input.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { LocalStorageService } from "./services/local-storage.service";
import { ApiService } from "./services/api.service";
import { DeleteButtonsComponent } from "./components/delete-buttons/delete-buttons.component";
import { Task } from './types/interfaces/task.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, TodoListComponent, DeleteButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  ngOnInit() {
    this.getTasks()
  }

  localStorageService = inject(LocalStorageService)
  APIService = inject(ApiService)

  firstFiveServerTasks:Task[] | undefined = []
  activeTasksArray: any[] = []
  compTasksArray:any[] = []
  
  activeLSKey = this.localStorageService.activeTasksArrayLSKey
  compLSKey = this.localStorageService.doneTasksArrayLSKey

  async getTasks () {
    const firstFiveServerTasks: Task[] | undefined = await this.APIService.getServerTasks()

    const activeLSTasks:any = this.localStorageService.getTasksArrayFromLS(this.activeLSKey)
    const doneLSTasks:any = this.localStorageService.getTasksArrayFromLS(this.compLSKey)

    this.firstFiveServerTasks = firstFiveServerTasks
    this.activeTasksArray = activeLSTasks
    this.compTasksArray = doneLSTasks
  }

  pushActiveTaskInArray(taskName:any) {
    this.activeTasksArray.push(taskName)
    this.localStorageService.setTasksArrayInLS(this.activeLSKey, this.activeTasksArray)
  }

  pushCompTaskInArray(taskName:any) {
    this.compTasksArray.push(taskName)
    this.localStorageService.setTasksArrayInLS(this.compLSKey, this.compTasksArray)
    this.deleteTask(taskName)
  }

  arrayFilter(array:any, taskName:any) {
    return array.filter((task:any) => task !== taskName)
  }

  deleteTask(taskName:any) {
    this.firstFiveServerTasks = this.arrayFilter(this.firstFiveServerTasks, taskName)
    this.activeTasksArray = this.arrayFilter(this.activeTasksArray, taskName)
    this.localStorageService.setTasksArrayInLS(this.activeLSKey, this.activeTasksArray)
  }
}

