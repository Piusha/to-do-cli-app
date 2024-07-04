import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
import { ITaskService } from '../interfaces/task-service.interface';
import { ITask } from '../interfaces/task.interface';
import { CommandArgument } from '../types/command-argument.types';
import { TaskPriority } from '../types/task.types';
import { getUniqTaskId } from '../util/util';
import { inputValidator } from '../validators/task.validator';

export const addCommand = {
  command: 'add <title> <description> <priority>',
  describe: 'Add a new item',
  handler: async (argv: any) => {
    const commandArgument = argv as CommandArgument;
    const isValid = inputValidator(commandArgument);

    if (!isValid) {
      return;
    }

    try {
      const taskService: ITaskService = getTaskServiceProvider<ITaskService>();

      const task: ITask = {
        id: getUniqTaskId(),
        title: commandArgument.title || '',
        description: commandArgument.description || '',
        priority: commandArgument.priority as TaskPriority,
      };
      await taskService.createTask(task);
      console.log('Task added successfully');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};
