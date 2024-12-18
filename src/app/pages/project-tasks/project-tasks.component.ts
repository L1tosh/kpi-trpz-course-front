import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {TaskList} from '../../models/task.model';
import {NgForOf, NgIf} from "@angular/common";
import {TaskCardComponent} from "../../common/ui/task-card/task-card.component";

@Component({
    selector: 'app-project-tasks',
    templateUrl: './project-tasks.component.html',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        TaskCardComponent
    ]
})
export class ProjectTasksComponent implements OnInit {
    projectId: number = 0;
    tasks: TaskList = {taskDtos: []}
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.projectId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

        if (this.projectId) {
            this.taskService.getAllTasks(this.projectId).subscribe(
                (taskData) => {
                    this.tasks = taskData;
                    this.loading = false;
                },
                (err) => {
                    this.error = 'Не удалось загрузить задачи';
                    this.loading = false;
                }
            );
        }
    }

    openCreateTaskModal() {
        this.router.navigate([`/projects/${this.projectId}/tasks/create`]);
    }
}
