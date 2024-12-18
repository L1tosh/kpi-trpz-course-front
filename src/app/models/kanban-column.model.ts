import {TaskList} from "./task.model";

export interface KanbanColumn {
    id: number;
    name: string;
    tasks: TaskList;
}
