import { routineType, updateRoutineType } from 'types/routine';
import { routineOrderType } from 'types/routine_order';

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
