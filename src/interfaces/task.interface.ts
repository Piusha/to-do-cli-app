import { TaskPriority, TaskStatus } from '../types/task.types';

export interface ITask {
  id: string;
  title?: string;
  description?: string;
  priority: TaskPriority;
  completed?: TaskStatus;
}

export interface IUpdateTask {
  id: string;
  title?: string;
  description?: string;
  priority?: TaskPriority;
  completed?: TaskStatus;
}
