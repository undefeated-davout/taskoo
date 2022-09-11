import { useContext, useEffect } from 'react';

import { UserContext } from 'pages/_app';

import { routineType } from 'types/routine';

import { getRoutines } from 'lib/api/routine';
import { getRoutineOrder } from 'lib/api/routine_order';
import { RoutineContext } from 'lib/contexts/RoutineContextProvider';
import { sortRoutines } from 'lib/models/routine';

export const useRoutineStatus = () => {
  const { user } = useContext(UserContext);
  const { routines, setRoutines, routineOrder, setRoutineOrder, routineStatus, setRoutineStatus } =
    useContext(RoutineContext);

  const userID = user!.uid;

  // routines, routineOrder情報取得
  useEffect(() => {
    const routinesUnsubscribe = getRoutines(userID, setRoutines);
    const routineOrderUnsubscribe = getRoutineOrder(userID, setRoutineOrder);
    return () => {
      routinesUnsubscribe();
      routineOrderUnsubscribe();
    };
  }, [setRoutineOrder, setRoutines, userID]);

  // routines, routineOrder情報をもとに、statusIDごとのソート済みroutinesを作成
  useEffect(() => {
    if (routines === undefined || routineOrder === undefined) return;

    const sortedRoutines = sortRoutines(routines, routineOrder);

    setRoutineStatus((prev) => {
      const newCheckedIDs = calcCheckedIDs(prev?.checkedIDs ?? [], sortedRoutines);
      return {
        routineOrderID: routineOrder?.id ?? '',
        sortedRoutines: sortedRoutines,
        checkedIDs: newCheckedIDs,
      };
    });
  }, [routineOrder, routines, setRoutineStatus]);

  return routineStatus;
};

const calcCheckedIDs = (checkedIDs: string[], routines: routineType[]): string[] => {
  // 削除されたIDはチェックONリストから除外しておく
  const routineIDs = routines.map((routine) => routine.id);
  const newCheckedIDs = checkedIDs.filter((id) => routineIDs.includes(id));
  return newCheckedIDs;
};
