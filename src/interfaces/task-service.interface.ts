import { ITask } from './task.interface';

export interface ITaskService {
  createTask(task: ITask): Promise<boolean>;
  getTasks(taskId: string): Promise<ITask[]>;
  removeTask(taskId: string): Promise<boolean>;
  updateTask(task: ITask): Promise<boolean>;
  completeTask(taskId: string): Promise<boolean>;
}
