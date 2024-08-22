export interface ITodo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export interface ITodoState {
    todos: ITodo[] | [];
    loading: boolean;
    error: string | null;
}

export interface IGenericResponse {
    message: string;
    status: number;
}