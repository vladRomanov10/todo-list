import {inject, Injectable} from '@angular/core';

import { Task } from '../types/interfaces/task.interface';

import { HttpClient } from "@angular/common/http";

import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http:HttpClient = inject(HttpClient)
  private readonly serverURL:string= 'https://jsonplaceholder.typicode.com/todos/'

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serverURL)
        .pipe(
            map((tasks:Task[]) => tasks.slice(0, 5))
        )
  }
}
