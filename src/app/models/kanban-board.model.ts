import { KanbanColumn } from './kanban-column.model';
import { Project } from './project.model';

export interface KanbanBoard {
    id: number;
    name: string;
    columns: KanbanColumn[];
    project: Project;
}
