import { atom } from 'recoil';

import { taskType } from 'types/task';

export type statusIDTasksType = { [statusID: string]: taskType[] };

export type kanbanTaskStateType = {
  taskOrderID: string;
  statusIDTasks: statusIDTasksType;
};

export const kanbanTaskState = atom<kanbanTaskStateType | null>({
  key: 'kanbanTask',
  default: null,
});
