import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
import { ITaskService } from '../interfaces/task-service.interface';
import { ITask } from '../interfaces/task.interface';

export const listTasksCommand = {
  command: 'list',
  describe: 'List tasks',
  handler: async (argv: any) => {
    try {
      const taskService: ITaskService = getTaskServiceProvider<ITaskService>();
      const tasks: ITask[] = await taskService.getTasks();
      tasks.forEach((task: ITask) => {
        console.log(`ID: ${task.id}`);
        console.log(`Title: ${task.title}`);
        console.log(`Description: ${task.description}`);
        console.log(`Priority: ${task.priority}`);
        console.log(`Completed: ${task.completed}`);
        console.log('--------------------------------');
      });
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};
