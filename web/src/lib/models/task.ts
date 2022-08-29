import { taskType } from 'types/task';

import { kanbanStatusConst } from 'lib/constants/kanban';

export const replaceStatusID = (isDone: boolean, statusID: string): string => {
  // 完了ならDONEに読み替え
  return isDone ? kanbanStatusConst.done : statusID;
};

export const lastTaskID = (tasks: taskType[]) => {
  return tasks.length === 0 ? '' : tasks[tasks.length - 1].id;
};
