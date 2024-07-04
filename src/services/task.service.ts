import { TaskStatus } from '../constant/app-constant';
import { TaskException } from '../exceptions/task.exceptions';
import { IRepository } from '../interfaces/repository.interface';
import { ITaskService } from '../interfaces/task-service.interface';
import { ITask } from '../interfaces/task.interface';
import { TaskValidator } from '../validators/task.validator';

export class TaskService implements ITaskService {
  constructor(private taskRepository: IRepository<ITask>) {}

  public async createTask(task: ITask): Promise<boolean> {
    const newTask = TaskValidator.createTask(task);

    await this.taskRepository.create(newTask);

    return true;
  }

  public async getTasks(): Promise<ITask[]> {
    return this.taskRepository.findAll();
  }

  public async removeTask(taskId: string): Promise<boolean> {
    return this.taskRepository.remove(taskId);
  }

  public async updateTask(task: ITask): Promise<boolean> {
    const taskToBeUpdated = await this.getTask(task.id);

    if (!taskToBeUpdated) {
      return false;
    }

    return await this.taskRepository.update(task);
  }

  public async completeTask(taskId: string): Promise<boolean> {
    const task = await this.getTask(taskId);

    if (!task) {
      return false;
    }

    task.completed = TaskStatus.COMPLETED;

    await this.updateTask(task);

    return true;
  }

  public async getTask(taskId: string): Promise<ITask | null> {
    const task = this.taskRepository.findById(taskId);

    if (!task) {
      throw TaskException.taskNotFound();
    }

    return task;
  }
}
