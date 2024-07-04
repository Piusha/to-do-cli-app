import { IRepository } from '../interfaces/repository.interface';
import { ITask } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';
import { JsonStorage } from '../storage/json-storage';

export function getTaskServiceProvider<T>(): TaskService {
  const JSONStorage: IRepository<ITask> = new JsonStorage();

  return new TaskService(JSONStorage);
}
