import { Component, Input, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TaskEntry} from "../../../models/task.model";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    imports: [
        RouterLink,
        NgIf
    ],
    standalone: true
})
export class TaskCardComponent implements OnInit {
    @Input() task!: TaskEntry;
    user!: User;

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.loadUserData(this.task.author);
    }

    loadUserData(userId: number): void {
        this.userService.getUserById(userId).subscribe(
            (userData: User) => {
                this.user = userData;
            },
            (error) => {
                console.error('Ошибка при загрузке данных пользователя', error);
            }
        );
    }

    navigateToTaskDetails(): void {
        this.router.navigate(['/task', this.task.id]);
    }

    navigateToUserProfile(): void {
        this.router.navigate(['/user', this.user.id]);
    }
}
