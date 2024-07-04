import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
import { ITaskService } from '../interfaces/task-service.interface';

export const removeTaskCommand = {
  command: 'remove <id>',
  describe: 'Remove tasks',
  handler: async (argv: any) => {
    try {
      const taskService: ITaskService = getTaskServiceProvider<ITaskService>();

      const taskId: string = argv.id;
      await taskService.removeTask(taskId);

      console.log('Task removed successfully');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};
