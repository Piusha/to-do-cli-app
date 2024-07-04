import { TaskPriorityEnum } from '../constant/app-constant';
import { CommandArgument } from '../types/command-argument.types';

export function isValidPriority(priority: string): boolean {
  const priorityEnum: TaskPriorityEnum = priority as TaskPriorityEnum;

  return [TaskPriorityEnum.HIGH, TaskPriorityEnum.LOW, TaskPriorityEnum.MEDIUM].includes(
    priorityEnum,
  );
}

export function inputValidator(commandArgument: CommandArgument): boolean {
  const validationBasket = [];
  if (!commandArgument.title) {
    validationBasket.push('Title');
  }
  if (!commandArgument.description) {
    validationBasket.push('Description');
  }

  if (!commandArgument.priority) {
    validationBasket.push('Priority');
  }

  if (validationBasket.length > 0) {
    console.error(`${validationBasket.join(', ')} is missing`);
    return false;
  }

  return true;
}
