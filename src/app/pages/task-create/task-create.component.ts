import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../models/task.model';
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {TokenService} from "../../auth/services/jwt.token.service";

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    imports: [
        FormsModule
    ],
    standalone: true
})
export class TaskCreateComponent {
    task: Task = {
        title: '',
        description: '',
        complexity: 1,
        startTime: '',
        endTime: '',
        createTime: new Date().toISOString(),
        taskStatus: 'New',
        taskType: 'General',
        author: 1,
        executor: 2
    };
    projectId: number = 0;
    authorId: number | null = null;

    constructor(
        private taskService: TaskService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.projectId = +params.get('id')!;
        });

        const decodedToken = this.tokenService.getDecodedToken();
        if (decodedToken) {
            this.authorId = +decodedToken.sub;
        }
    }

    createTask(): void {
        if (this.authorId === null || this.projectId === null) {
            console.error('Ошибка: автор не найден');
            return;
        } else {
            this.task.author = this.authorId;
        }

        this.taskService.createTask(this.projectId, this.task).subscribe(
            (newTask) => {
                this.router.navigate([`/projects/${this.projectId}/tasks`]);
            },
            (error) => {
                console.error('Ошибка при создании задачи:', error);
            }
        );
    }
}
