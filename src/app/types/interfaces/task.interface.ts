export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}


type TaskStatus = 'TODO' | 'COMPLETED';
