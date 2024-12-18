import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../models/task.model";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
    @Input() task: Task = {
        title: '',
        description: '',
        complexity: 1,
        startTime: '',
        endTime: '',
        createTime: '',
        taskStatus: '',
        taskType: '',
        author: 0,
        executor: 0,
    };
    @Input() isEditMode: boolean = false;
    @Output() submitHandler = new EventEmitter<Task>();

    onSubmit(): void {
        this.submitHandler.emit(this.task);
    }
}
