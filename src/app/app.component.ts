import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./input/input.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { LocalStorageService } from "./local-storage.service";
import { ApiService } from "./api.service";
import { DeleteButtonsComponent } from "./delete-buttons/delete-buttons.component";

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

  firstFiveServerTasks:any[] = []
  activeTasksArray: any[] = []
  compTasksArray:any[] = []

  activeLSKey = this.localStorageService.activeTasksArrayLSKey
  compLSKey = this.localStorageService.doneTasksArrayLSKey

  async getTasks () {
    await this.APIService.getServerTasks()

    const firstFiveServerTasks:any = this.APIService.firstFiveServerTasks
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

