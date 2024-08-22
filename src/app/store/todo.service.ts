import { Injectable } from "@angular/core";
import { IGenericResponse, ITodo } from "./todo.interface";
import { BehaviorSubject, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodoService {
    private todos: ITodo[] = [];
    private todosSubject: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>(this.todos);

    getTodos(): Observable<ITodo[]> {
        return this.todosSubject.asObservable();
    }

    addTodo(todo: ITodo): Observable<IGenericResponse> {
        if (!todo.title.trim() || !todo.description.trim()) {
            return throwError(() => new Error('Title and description are required'));
        }

        this.todos = [...this.todos, todo];
        this.todosSubject.next([...this.todos]);

        return new Observable(observer => {
            observer.next({
                message: 'Todo added successfully',
                status: 200
            });
            observer.complete();
        });
    }

    completeTodo(todoId: number): Observable<IGenericResponse> {
        this.todos = this.todos.map(todo => 
            todo.id === todoId ? { ...todo, completed: true } : todo
        );
        this.todosSubject.next([...this.todos]);

        return new Observable(observer => {
            observer.next({
                message: 'Todo completed successfully',
                status: 200
            });
            observer.complete();
        });
    }
}
