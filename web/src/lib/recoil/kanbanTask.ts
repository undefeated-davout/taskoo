import { atom } from 'recoil';

import { taskType } from 'types/task';

export const kanbanTaskState = atom<{
  taskOrderID: string;
  statusIDTasks: { [statusID: string]: taskType[] };
} | null>({
  key: 'kanbanTask',
  default: null,
});
