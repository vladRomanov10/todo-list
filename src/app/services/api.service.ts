import {inject, Injectable} from '@angular/core';

import { Task } from '../types/interfaces/task.interface';

import { HttpClient } from "@angular/common/http";

import {catchError, map, Observable, of, take} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http:HttpClient = inject(HttpClient)
  private readonly serverURL:string= 'https://jsonplaceholder.typicode.com/todos/'

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serverURL)
        .pipe(
            take(1),
            map((tasks:Task[]) => tasks.slice(0, 5)),
            catchError(this.handleError())
        )
  }

  private handleError() {
    return (error: any): Observable<Task[]> => {
      console.error(error)
      alert('Something went wrong')
      return of([])
    }
  }
}
