import { taskType } from 'types/task';

import { kanbanStatusConst } from 'lib/constants/kanban';

export const replaceStatusID = (isDone: boolean, statusID: string): string => {
  // 完了ならDONEに読み替え
  return isDone ? kanbanStatusConst.done : statusID;
};

export const lastTaskID = (tasks: taskType[]) => {
  return tasks.length === 0 ? '' : tasks[tasks.length - 1].id;
};

export const sortTasks = (tasks: taskType[]) => {
  let sorted: taskType[] = [];

  const idDict = tasks.reduce((dict: { [type: string]: taskType }, task) => {
    dict[task.id] = task;
    return dict;
  }, {});

  const firstTask = tasks.find(
    (task) => !tasks.some((someTask) => someTask.nextID === task.id),
  );
  if (!firstTask) {
    console.error('sortTasks error');
    return sorted;
  }
  let key = firstTask.id;
  for (let i = 0; i < tasks.length; i++) {
    if (idDict[key] === undefined) break;
    const task = idDict[key];
    sorted.push(task);
    key = task.nextID;
  }

  return sorted;
};
