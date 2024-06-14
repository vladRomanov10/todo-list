import { Component } from '@angular/core';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
