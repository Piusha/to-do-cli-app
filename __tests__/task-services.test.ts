import { v4 } from 'uuid';
import { IRepository } from '../src/interfaces/repository.interface';
import { ITask } from '../src/interfaces/task.interface';
import { TaskService } from '../src/services/task.service';
import { JsonStorage } from '../src/storage/json-storage';

describe('TaskService', () => {
  it('should expect TaskException task before saving', async () => {
    const JSONStorage: IRepository<ITask> = new JsonStorage();
    const taskService = new TaskService(JSONStorage);
    const task: ITask = {
      id: v4(),
      title: '',
      priority: 'low',
      completed: 'pending',
    };

    try {
      await taskService.createTask(task);
    } catch (error) {
      expect((error as any).message).toBe('title or priority is missing');
    }
  });

  it('should create task', async () => {
    const JSONStorage: IRepository<ITask> = new JsonStorage();
    const taskService = new TaskService(JSONStorage);
    const task: ITask = {
      id: v4(),
      title: 'New Task',
      priority: 'low',
      completed: 'pending',
    };

    const result = await taskService.createTask(task);

    expect(result).toBe(true);
  });

  it('should get all tasks', async () => {
    const JSONStorage: IRepository<ITask> = new JsonStorage();
    const taskService = new TaskService(JSONStorage);

    const result = await taskService.getTasks();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('priority');
    expect(result[0]).toHaveProperty('completed');
  });

  it('should remove task', async () => {
    const JSONStorage: IRepository<ITask> = new JsonStorage();
    const taskService = new TaskService(JSONStorage);
    const tasks = await taskService.getTasks();
    const taskId = tasks[0].id;

    const result = await taskService.removeTask(taskId);

    const updatedTasks = await taskService.getTasks();
    expect(result).toBe(true);
    expect(tasks.length).not.toEqual(updatedTasks.length);
  });

  it('should update task', async () => {
    const JSONStorage: IRepository<ITask> = new JsonStorage();
    const taskService = new TaskService(JSONStorage);
    const tasks = await taskService.getTasks();
    const task = tasks[0];
    task.title = 'Updated Task';

    const result = await taskService.updateTask(task);

    const updatedTasks = await taskService.getTasks();
    expect(result).toBe(true);
    expect(updatedTasks[0].title).toBe('Updated Task');
  });

  it('should complete task', async () => {
    const JSONStorage: IRepository<ITask> = new JsonStorage();
    const taskService = new TaskService(JSONStorage);
    const tasks = await taskService.getTasks();
    const taskId = tasks[0].id;

    const result = await taskService.completeTask(taskId);

    const completedTask = await taskService.getTasks();

    expect(result).toBe(true);
    expect(completedTask[0].completed).toBe('completed');
  });
});
