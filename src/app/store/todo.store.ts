import { Store, createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";
import { IGenericResponse, ITodo, ITodoState } from "./todo.interface";
import { inject } from "@angular/core";

// State
const initialTodoState: ITodoState = {
    todos: [],
    loading: false,
    error: null,
}

// Actions
export const todoActions = createActionGroup({
    source: 'Todo',
    events: {
        GetTodos: emptyProps(),
        GetTodosSuccess: props<{ payload: ITodo[] }>(),
        GetTodosError: props<{ error: string }>(),

        AddTodo: props<{ payload: ITodo }>(),
        AddTodoSuccess: props<{ payload: IGenericResponse }>(),
        AddTodoError: props<{ error: string }>(),

        CompleteTodo: props<{ payload: {id: number} }>(),
        CompleteTodoSuccess: props<{ payload: IGenericResponse }>(),
        CompleteTodoError: props<{ error: string }>(),

    },
});

// Reducer & Selectors
export const todoFeature = createFeature({
    name: 'todo',
    reducer: createReducer(
        initialTodoState,
        on(
            todoActions.getTodos,
            todoActions.addTodo,
            todoActions.completeTodo,
            (state): ITodoState => ({
                ...state,
                loading: true,
                error: null,
            })
        ),
        on(
            todoActions.getTodosSuccess,
            (state, { payload }): ITodoState => ({
                ...state,
                todos: payload,
                loading: false,
                error: null,
            })
        ),
        on(
            todoActions.getTodosError,
            todoActions.addTodoError,
            todoActions.completeTodoError,
            (state, { error }): ITodoState => ({
                ...state,
                loading: false,
                error: error,
            })
        ),
    ),
});

// Inject
export function injectTodoFeature() {
    const store = inject(Store);

    return {
        // Actions
        getTodos: () => store.dispatch(todoActions.getTodos()),
        addTodo: (payload: ITodo) => store.dispatch(todoActions.addTodo({ payload })),
        completeTodo: (payload: {id: number}) => store.dispatch(todoActions.completeTodo({ payload })),
        // Selectors
        selectTodos: store.selectSignal(todoFeature.selectTodos),
    };
}

