import { ITask, IUpdateTask } from './task.interface';

export interface ITaskService {
  createTask(task: ITask): Promise<boolean>;
  getTasks(): Promise<ITask[]>;
  removeTask(taskId: string): Promise<boolean>;
  updateTask(task: IUpdateTask): Promise<boolean>;
  completeTask(taskId: string): Promise<boolean>;
}
