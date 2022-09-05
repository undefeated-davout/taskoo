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

  // ソート順が破損しているのでそのまま並べて返す
  if (taskOrder == null) {
    return statusIDTasks;
  }

  let sortedStatusIDTasks: { [statusID: string]: taskType[] } = {};
  for (const statusID in statusIDTasks) {
    const tasks = statusIDTasks[statusID];
    // 該当statusIDの情報がなければそのままtasksを詰める
    if (taskOrder.orderDict[statusID] === undefined) {
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
    // ソート順の数と異なる場合は破損しているのでそのままかえす
    if (orders.length !== tasks.length) return statusIDTasks;
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
  distTaskID: string,
  isSetNext: boolean,
  statusID: string,
  prevStatusID: string,
  updatedTask: updateTaskType,
  statusIDTasks: statusIDTasksType,
): statusIDTasksType => {
  // 引数を値渡し化
  let newStatusIDTasksType: statusIDTasksType = {};
  for (const statusID in statusIDTasks) {
    newStatusIDTasksType[statusID] = [...statusIDTasks[statusID]];
  }

  let idTaskDict: { [id: string]: taskType } = {};
  for (const statusID in newStatusIDTasksType) {
    newStatusIDTasksType[statusID].forEach((task) => {
      idTaskDict[task.id] = task;
    });
  }
  const newTask = { ...idTaskDict[taskID], ...updatedTask };

  if (statusID === prevStatusID && distTaskID === '') {
    // 移動しない（タスクの更新のみ）
    newStatusIDTasksType[statusID]?.forEach((task) => {
      if (task.id === taskID) {
        task = newTask;
      }
    });
  } else {
    // 移動を伴う処理
    // 移動元のstatusIDからtaskIDを除去
    if (newStatusIDTasksType[prevStatusID]) {
      newStatusIDTasksType[prevStatusID] = newStatusIDTasksType[
        prevStatusID
      ].filter((task) => task.id !== taskID);
    }
    // 移動先のstatusIDにtaskを追加
    const distTaskIndex =
      newStatusIDTasksType[statusID]?.findIndex(
        (task) => task.id === distTaskID,
      ) ?? 0;
    const setTaskIndex = isSetNext ? distTaskIndex + 1 : distTaskIndex;
    newStatusIDTasksType[statusID] === undefined
      ? (newStatusIDTasksType[statusID] = [newTask])
      : newStatusIDTasksType[statusID].splice(setTaskIndex, 0, newTask);
  }
  return newStatusIDTasksType;
};
