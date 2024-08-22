import { Component, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectTodoFeature } from './store/todo.store';
import { ITodo } from './store/todo.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Object that contains all the todoFeature we created in the store
  readonly todoFeature = injectTodoFeature();

  // Variables to store the new todo title and description
  newTodoTitle: string = '';
  newTodoDescription: string = '';

  // After getTodos() is called, todos will be stored in todos automatically
  todos: Signal<ITodo[]> = computed(() => this.todoFeature.selectTodos());

  ngOnInit(): void {
      this.todoFeature.getTodos();
  }

  public addTodo(): void {
    this.todoFeature.addTodo({
      id: Math.random(),
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      completed: false
    });
  }

  public completeTodo(todo: ITodo): void {    
    this.todoFeature.completeTodo({
      id: todo.id
    });
  }
}
