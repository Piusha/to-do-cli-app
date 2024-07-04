import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
import { ITaskService } from '../interfaces/task-service.interface';
import { IUpdateTask } from '../interfaces/task.interface';
import { CommandArgument } from '../types/command-argument.types';
import { TaskPriority } from '../types/task.types';

export const updateCommand = {
  command: 'update <id>',
  describe: 'Update a task',
  handler: async (argv: any) => {
    if (!argv.id) {
      return;
    }

    console.log(argv);
    try {
      const commandArgument = argv as CommandArgument;

      const taskService: ITaskService = getTaskServiceProvider<ITaskService>();

      const task: IUpdateTask = {
        id: argv.id,
        title: commandArgument.title,
        description: commandArgument.description,
        priority: commandArgument.priority as TaskPriority,
      };
      await taskService.updateTask(task);

      console.log('Task updated successfully');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};
