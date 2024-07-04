type Priority = 'low' | 'medium' | 'high';
type Status = 'completed' | 'pending';

export interface ITask {
  id: string;
  title: string;
  priority: Priority;
  completed: Status;
}
