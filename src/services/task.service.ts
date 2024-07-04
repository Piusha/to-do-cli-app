import { TaskStatusEnum } from '../constant/app-constant';
import { TaskException } from '../exceptions/task.exceptions';
import { IRepository } from '../interfaces/repository.interface';
import { ITaskService } from '../interfaces/task-service.interface';
import { ITask, IUpdateTask } from '../interfaces/task.interface';
import { isValidPriority } from '../validators/task.validator';

export class TaskService implements ITaskService {
  constructor(private taskRepository: IRepository<ITask>) {}

  public async createTask(task: ITask): Promise<boolean> {
    if (!isValidPriority(task.priority)) {
      throw TaskException.taskValidationError(
        'Invalid priority. Priority should be low, medium or high',
      );
    }
    task.completed = TaskStatusEnum.PENDING;

    await this.taskRepository.create(task);

    return true;
  }

  public async getTasks(): Promise<ITask[]> {
    return this.taskRepository.findAll();
  }

  public async removeTask(taskId: string): Promise<boolean> {
    const task = await this.getTask(taskId);

    return this.taskRepository.remove(task.id);
  }

  public async updateTask(task: IUpdateTask): Promise<boolean> {
    const taskToBeUpdated = await this.getTask(task.id);

    if (task.priority && !isValidPriority(task.priority)) {
      throw TaskException.taskValidationError(
        'Invalid priority. Priority should be low, medium or high',
      );
    }

    const taskToBeUpdatedData: ITask = {
      ...taskToBeUpdated,
    };

    if (task.title) {
      taskToBeUpdatedData.title = task.title;
    }

    if (task.description) {
      taskToBeUpdatedData.description = task.description;
    }

    if (task.priority) {
      taskToBeUpdatedData.priority = task.priority;
    }

    if (task.completed) {
      taskToBeUpdatedData.completed = task.completed;
    }

    return await this.taskRepository.update(taskToBeUpdatedData);
  }

  public async completeTask(taskId: string): Promise<boolean> {
    const task = await this.getTask(taskId);

    task.completed = TaskStatusEnum.COMPLETED;

    await this.updateTask(task);

    return true;
  }

  public async getTask(taskId: string): Promise<ITask> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw TaskException.taskNotFound();
    }

    return task;
  }
}
