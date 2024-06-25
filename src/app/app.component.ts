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

  activeTasksArray: any[] = []
  compTasksArray:any[] = []

  activeLSKey = this.localStorageService.activeTasksArrayLSKey
  compLSKey = this.localStorageService.doneTasksArrayLSKey

  async getTasks () {
    await this.APIService.getServerTasks()

    const firstFiveServerTasks:any = this.APIService.firstFiveServerTasks
    const activeLSTasks:any = this.localStorageService.getTasksArrayFromLS(this.activeLSKey)
    const doneLSTasks:any = this.localStorageService.getTasksArrayFromLS(this.compLSKey)

    this.activeTasksArray = [...firstFiveServerTasks, ...activeLSTasks]
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

  deleteTask(taskName:any) {
    this.activeTasksArray = this.activeTasksArray.filter((task) => task !== taskName)
    this.localStorageService.setTasksArrayInLS(this.activeLSKey, this.activeTasksArray)
  }
}
