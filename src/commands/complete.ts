import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
import { ITaskService } from '../interfaces/task-service.interface';

export const completeTaskCommand = {
  command: 'complete <id>',
  describe: 'Complete a task',
  handler: async (argv: any) => {
    try {
      if (!argv.id) {
        console.error('Please provide a task id');
        return;
      }

      const taskService: ITaskService = getTaskServiceProvider<ITaskService>();

      await taskService.completeTask(argv.id);

      console.log('Task completed successfully');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};
