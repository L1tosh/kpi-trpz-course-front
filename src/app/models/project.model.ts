import {EventList} from "./event.model";
import {TaskList} from "./task.model";
import {SprintList} from "./sprint.model";

export interface Project {
    id: number;
    name: string;
    description: string;
    owner: number;
}

export interface ProjectEntry extends Project {
    workers: number[];
    events: EventList;
    tasks: TaskList;
    sprints: SprintList;
}

export interface ProjectList {
    projectDtos: Project[];
}
