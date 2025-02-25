import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, CreateTodoCommand, UpdateTodoCommand } from '../models/todo.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private apiUrl = `${environment.apiUrl}/api/todo`;

    constructor(private http: HttpClient) { }

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    getTodoById(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiUrl}/${id}`);
    }

    createTodo(command: CreateTodoCommand): Observable<number> {
        return this.http.post<number>(this.apiUrl, command);
    }

    updateTodo(command: UpdateTodoCommand): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${command.id}`, command);
    }

    deleteTodo(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
} 