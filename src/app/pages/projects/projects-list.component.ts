import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Project, ProjectList} from '../../models/project.model'; // Добавим импорт интерфейса Project
import {TokenService} from "../../auth/services/jwt.token.service"; // Добавим импорт интерфейса ProjectList

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ]
})
export class ProjectsListComponent implements OnInit {
    projects: Project[] = [];
    loading: boolean = true;
    error: string | null = null;

    constructor(private projectService: ProjectService,
                private tokenService: TokenService,) {}

    ngOnInit(): void {
        const userId = this.tokenService.getDecodedToken()?.sub;

        if (userId) {
            const numericId = Number(userId);
            this.projectService.getAllProjects(numericId).subscribe(
                (data: ProjectList) => {
                    this.projects = data.projectDtos;
                    this.loading = false;
                },
                (error) => {
                    this.error = 'Не удалось загрузить проекты';
                    this.loading = false;
                }
            );
        } else {
            this.error = 'Не удалось получить ID пользователя из токена';
            this.loading = false;
        }
    }
}
