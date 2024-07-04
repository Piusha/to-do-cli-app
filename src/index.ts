import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addCommand } from './commands/add';
import { listTasksCommand } from './commands/list';
import { removeTaskCommand } from './commands/remove';
import { completeTaskCommand } from './commands/complete';
import { updateCommand } from './commands/update';

yargs(hideBin(process.argv))
  .command(addCommand)
  .command(listTasksCommand)
  .command(removeTaskCommand)
  .command(completeTaskCommand)
  .command(updateCommand)
  .help().argv;
