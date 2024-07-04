import { v4 } from 'uuid';

export function getUniqTaskId(): string {
  return v4();
}
