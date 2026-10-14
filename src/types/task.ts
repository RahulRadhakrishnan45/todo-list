export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    completedAt: string | null;
}

export type TaskFilter = 'all' | 'completed' | 'active';
