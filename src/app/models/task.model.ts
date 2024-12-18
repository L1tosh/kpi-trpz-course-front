export interface Task {
    title: string;
    description: string;
    complexity: number;

    startTime: string;
    endTime: string;
    createTime: string;

    taskStatus: string;
    taskType: string;

    author: number;
    executor: number;
}

export interface TaskEntry extends Task {
    id: number;
}

export interface TaskList {
    taskDtos: TaskEntry[];
}
