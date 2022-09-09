import { routineType } from 'types/routine';
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
