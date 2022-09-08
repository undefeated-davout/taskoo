import { useContext, useEffect } from 'react';

import { UserContext } from 'pages/_app';

import { getRoutines } from 'lib/api/routine';
import { getRoutineOrder } from 'lib/api/routine_order';
import { RoutineContext } from 'lib/contexts/RoutineContextProvider';

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
    // const sortedStatusIDRoutines = sortStatusIDRoutines(routines, routineOrder);
    // if (sortedStatusIDRoutines === null) return;
    setRoutineStatus({
      routineOrderID: routineOrder?.id ?? '',
      sortedRoutines: routines ?? [],
    });
  }, [routineOrder, routines, setRoutineStatus]);

  return routineStatus;
};
