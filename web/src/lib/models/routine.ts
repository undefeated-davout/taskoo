import { routineType, updateRoutineType } from 'types/routine';
import { routineOrderType } from 'types/routine_order';
import { addTaskType, statusIDTasksType } from 'types/task';

import { addTaskWithOrder } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';

export const sortRoutines = (routines: routineType[], routineOrder: routineOrderType | null): routineType[] => {
  if (routineOrder === null) return routines;
  const orders = routineOrder.order.split(',');
  if (orders.length !== routines.length) return routines;
  const routinIDRoutineDict = routines.reduce((dict: { [key: string]: routineType }, routine) => {
    dict[routine.id] = routine;
    return dict;
  }, {});
  const sortedRoutines = orders.map((routineID) => routinIDRoutineDict[routineID]);
  return sortedRoutines;
};

export const calcRoutines = (
  routineID: string,
  distRoutineID: string,
  isSetNext: boolean,
  updatedRoutine: updateRoutineType,
  routines: routineType[],
): routineType[] => {
  const updateTargetRoutine = routines.find((routine) => routine.id === routineID);
  if (updateTargetRoutine === undefined) return routines;
  const newRoutine = { ...updateTargetRoutine, ...updatedRoutine };
  // 対象のroutineIDを除去
  let newRoutines = routines.filter((routine) => routine.id !== routineID);
  const distRoutineIndex = newRoutines.findIndex((routine) => routine.id === distRoutineID);
  const setRoutinIndex = isSetNext ? distRoutineIndex + 1 : distRoutineIndex;
  newRoutines.splice(setRoutinIndex, 0, newRoutine);
  return newRoutines;
};

export const copyRoutines = async (
  sortedRoutines: routineType[],
  checkedIDs: string[],
  statusIDTasks: statusIDTasksType,
  userID: string,
  taskOrderID: string,
) => {
  const routineIDRoutineDict = sortedRoutines.reduce((dict: { [key: string]: routineType }, routine) => {
    dict[routine.id] = routine;
    return dict;
  }, {});
  const registerdRoutineIDs = Object.keys(statusIDTasks).reduce((ids: string[], statusID) => {
    const routinIDs = statusIDTasks[statusID]
      .filter((task) => task.routineID !== undefined)
      .map((task) => task.routineID) as string[];
    ids = ids.concat(routinIDs);
    return ids;
  }, []);
  // IDsをソート
  let sortedCheckedRoutines: routineType[] = [];
  sortedRoutines.forEach((routine) => {
    if (!checkedIDs.includes(routine.id)) return; // チェックOFFは除外
    if (registerdRoutineIDs.includes(routine.id)) return; // 登録済みのidは除外
    sortedCheckedRoutines.push(routineIDRoutineDict[routine.id]);
  });

  // 登録するタスクリストを作成
  const newTasks: addTaskType[] = sortedCheckedRoutines.map((routine) => ({
    statusID: kanbanStatusConst.doing,
    title: routine.title,
    isChecked: false,
    routineID: routine.id,
  }));
  // 登録
  addTaskWithOrder(userID, kanbanStatusConst.doing, newTasks, taskOrderID, statusIDTasks);
};
