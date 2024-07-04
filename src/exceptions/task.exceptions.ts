export class TaskException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaskException';
  }

  static taskValidationError(message: string): TaskException {
    const errorMessage = message ? message : 'Task creation failed';

    return new TaskException(errorMessage);
  }

  static taskNotFound(message?: string): TaskException {
    const errorMessage = message ? message : 'Task not found';

    return new TaskException(errorMessage);
  }
}
