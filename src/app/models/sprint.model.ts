import { Project } from './project.model';
import {TaskList} from "./task.model";

export interface Sprint {
    startTime: string;
    endTime: string;
    command: number[];
    tasks: TaskList;
    project: Project;
}

export interface SprintList {
    sprintDtos: Sprint[];
}
