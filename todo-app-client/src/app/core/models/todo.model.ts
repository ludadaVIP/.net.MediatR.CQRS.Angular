export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
    completedAt?: Date;
}

export interface CreateTodoCommand {
    title: string;
    description: string;
}

export interface UpdateTodoCommand {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
} 