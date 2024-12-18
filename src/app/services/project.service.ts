import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectEntry } from '../models/project.model';
import { ProjectList } from '../models/project.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private apiUrl = 'http://localhost:8080/api/v1/projects';

    constructor(private http: HttpClient) {}

    getProjectById(projectId: number, fullInfo: boolean = false): Observable<ProjectEntry> {
        const params = new HttpParams().set('fullInfo', fullInfo.toString());
        return this.http.get<ProjectEntry>(`${this.apiUrl}/${projectId}`, { params });
    }

    getAllProjects(userId?: number): Observable<ProjectList> {
        let params = new HttpParams();
        if (userId) {
            params = params.set('userId', userId.toString());
        }
        return this.http.get<ProjectList>(this.apiUrl, { params });
    }

    createProject(project: Project): Observable<ProjectEntry> {
        return this.http.post<ProjectEntry>(this.apiUrl, project);
    }

    updateProject(projectId: number, updatedProject: Project): Observable<Project> {
        return this.http.put<Project>(`${this.apiUrl}/${projectId}`, updatedProject);
    }

    deleteProject(projectId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
    }
}
