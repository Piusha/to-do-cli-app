import { ITask } from '../interfaces/task.interface';
import { TaskException } from '../exceptions/task.exceptions';

export class TaskValidator {
  public static createTask(task: ITask): ITask {
    if (!task.title || !task.priority) {
      throw TaskException.taskValidationError('title or priority is missing');
    }

    return task;
  }
}
