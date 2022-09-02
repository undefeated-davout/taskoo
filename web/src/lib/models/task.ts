import { taskType } from 'types/task';
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
