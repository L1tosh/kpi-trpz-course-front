import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskEntry, TaskList } from '../models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = 'http://localhost:8080/api/v1/projects';

    constructor(private http: HttpClient) {}

    getTaskById(projectId: number, taskId: number): Observable<TaskEntry> {
        return this.http.get<TaskEntry>(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
    }

    getAllTasks(projectId: number): Observable<TaskList> {
        return this.http.get<TaskList>(`${this.apiUrl}/${projectId}/tasks`);
    }

    createTask(projectId: number, task: Task): Observable<TaskEntry> {
        return this.http.post<TaskEntry>(`${this.apiUrl}/${projectId}/tasks`, task);
    }

    updateTask(projectId: number, taskId: number, updatedTask: Task): Observable<TaskEntry> {
        return this.http.put<TaskEntry>(`${this.apiUrl}/${projectId}/tasks/${taskId}`, updatedTask);
    }

    deleteTask(projectId: number, taskId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
    }
}
