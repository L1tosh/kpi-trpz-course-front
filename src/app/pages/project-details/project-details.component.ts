import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { ProjectEntry } from '../../models/project.model';
import { User } from '../../models/user.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ]
})
export class ProjectDetailsComponent implements OnInit {
    project: ProjectEntry | null = null;
    owner: User | null = null;
    workers: User[] = [];
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private projectService: ProjectService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        const projectId: number | null = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

        if (projectId) {
            this.projectService.getProjectById(projectId, true).subscribe(
                (projectData) => {
                    this.project = projectData;
                    this.loadUsers(projectData.owner, projectData.workers);
                },
                (err) => {
                    this.error = 'Не удалось загрузить проект';
                    this.loading = false;
                }
            );
        }
    }

    loadUsers(ownerId: number, workerIds: number[]): void {
        this.userService.getUserById(ownerId).subscribe(
            (user) => {
                this.owner = user;
            },
            (err) => {
                this.error = 'Не удалось загрузить владельца';
            }
        );

        workerIds.forEach(id => {
            this.userService.getUserById(id).subscribe(
                (user) => {
                    this.workers.push(user);
                },
                (err) => {
                    this.error = 'Не удалось загрузить пользователей';
                }
            );
        });

        this.loading = false;
    }

    // Переход к страницам тасков, спринтов и досок
    navigateToTasks() {
        if (this.project) {
            this.router.navigate([`/projects/${this.project.id}/tasks`]);
        }
    }

    navigateToSprints() {
        if (this.project) {
            this.router.navigate([`/projects/${this.project.id}/sprints`]);
        }
    }

    navigateToBoards() {
        if (this.project) {
            this.router.navigate([`/projects/${this.project.id}/kanban`]);
        }
    }
}
