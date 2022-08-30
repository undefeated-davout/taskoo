import { taskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

import { kanbanStatusConst } from 'lib/constants/kanban';

export const replaceStatusID = (isDone: boolean, statusID: string): string => {
  // 完了ならDONEに読み替え
  return isDone ? kanbanStatusConst.done : statusID;
};

export const lastTaskID = (tasks: taskType[]) => {
  return tasks.length === 0 ? '' : tasks[tasks.length - 1].id;
};

export const sortTasks = (
  tasks: taskType[],
  taskOrder: taskOrderType | null,
) => {
  if (tasks.length === 0 || taskOrder === null) return [];

  const orders = taskOrder.order.split(',');
  const taskIDTaskDict = tasks.reduce(
    (dict: { [key: string]: taskType }, task) => {
      dict[task.id] = task;
      return dict;
    },
    {},
  );
  const sortedTasks = orders.map((taskID, _) => taskIDTaskDict[taskID]);
  return sortedTasks;
};
