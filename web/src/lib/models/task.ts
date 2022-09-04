import { statusIDTasksType, taskType, updateTaskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

export const sortStatusIDTasks = (
  tasks: taskType[],
  taskOrder: taskOrderType | null,
): { [statusID: string]: taskType[] } | null => {
  // タスクの一覧を、statusIDごとのリストに変換
  const statusIDTasks = tasks.reduce(
    (dict: { [statusID: string]: taskType[] }, task) => {
      dict[task.statusID]
        ? dict[task.statusID].push(task)
        : (dict[task.statusID] = [task]);
      return dict;
    },
    {},
  );

  let sortedStatusIDTasks: { [statusID: string]: taskType[] } = {};
  for (const statusID in statusIDTasks) {
    const tasks = statusIDTasks[statusID];
    if (taskOrder === null || taskOrder.orderDict[statusID] === undefined) {
      sortedStatusIDTasks[statusID] = tasks;
      continue;
    }
    // taskIDごとにtask情報を保持
    const taskIDTaskDict = tasks.reduce(
      (dict: { [key: string]: taskType }, task) => {
        dict[task.id] = task;
        return dict;
      },
      {},
    );
    // ソート順のtaskIDリスト
    const orders = taskOrder.orderDict[statusID].split(',');
    if (orders.length !== tasks.length) return null;
    // ソート順IDリストをもとに、task情報のリストを作成
    let sortedTasks: taskType[] = [];
    orders.forEach((taskID) => {
      if (taskIDTaskDict[taskID]) sortedTasks.push(taskIDTaskDict[taskID]);
    });
    // statusIDごとに詰める
    sortedStatusIDTasks[statusID] = sortedTasks;
  }
  return sortedStatusIDTasks;
};

export const calcStatusIDTasks = (
  taskID: string,
  updatedTask: updateTaskType,
  statusIDTasks: statusIDTasksType,
): statusIDTasksType => {
  // 引数を値渡し化
  let newStatusIDTasksType: statusIDTasksType = {};
  for (const statusID in statusIDTasks) {
    newStatusIDTasksType[statusID] = [...statusIDTasks[statusID]];
  }
  // statusIDが不変なら終了
  if (
    updatedTask.statusID === undefined ||
    updatedTask.prevStatusID === undefined
  )
    return newStatusIDTasksType;

  let idTaskDict: { [id: string]: taskType } = {};
  for (const statusID in newStatusIDTasksType) {
    newStatusIDTasksType[statusID].forEach((task) => {
      idTaskDict[task.id] = task;
    });
  }

  const newTask = { ...idTaskDict[taskID], ...updatedTask };

  // 移動先のstatusIDにtaskを追加
  newStatusIDTasksType[updatedTask.statusID]
    ? newStatusIDTasksType[updatedTask.statusID].unshift(newTask)
    : (newStatusIDTasksType[updatedTask.statusID] = [newTask]);
  // 移動元のstatusIDからtaskIDを除去
  if (newStatusIDTasksType[updatedTask.prevStatusID]) {
    newStatusIDTasksType[updatedTask.prevStatusID] = newStatusIDTasksType[
      updatedTask.prevStatusID
    ].filter((task) => task.id !== taskID);
  }

  return newStatusIDTasksType;
};
