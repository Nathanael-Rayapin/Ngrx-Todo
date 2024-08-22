import { Injectable, inject } from "@angular/core";
import { injectTodoFeature, todoActions } from "./todo.store";
import { TodoService } from "./todo.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { IGenericResponse, ITodo } from "./todo.interface";

@Injectable({ providedIn: 'root' })
export class TodoEffect {
    readonly todoFeature = injectTodoFeature();

    constructor(
        private readonly todoService: TodoService,
    ) { }

    GetTodos$ = createEffect((actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(todoActions.getTodos, todoActions.addTodoSuccess, todoActions.completeTodoSuccess),
            switchMap(() => {
                return this.todoService.getTodos().pipe(
                    map((response: ITodo[]) => {
                        return todoActions.getTodosSuccess({ payload: response });
                    }),
                    catchError((err: IGenericResponse) => {
                        return of(todoActions.getTodosError({ error: err.message }));
                    })
                );
            })
        );
    });

    AddTodo$ = createEffect((actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(todoActions.addTodo),
            switchMap((action) => {
                return this.todoService.addTodo(action.payload).pipe(
                    map((response: IGenericResponse) => {
                        return todoActions.addTodoSuccess({ payload: response });
                    }),
                    catchError((err: IGenericResponse) => {
                        alert(err.message);
                        return of(todoActions.addTodoError({ error: err.message }));
                    })
                );
            })
        );
    });

    CompleteTodo$ = createEffect((actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(todoActions.completeTodo),
            switchMap((action) => {
                return this.todoService.completeTodo(action.payload.id).pipe(
                    map((response: IGenericResponse) => {
                        return todoActions.completeTodoSuccess({ payload: response });
                    }),
                    catchError((err: IGenericResponse) => {
                        return of(todoActions.completeTodoError({ error: err.message }));
                    })
                );
            })
        );
    });
}