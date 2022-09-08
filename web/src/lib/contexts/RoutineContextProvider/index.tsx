import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { routineStatusType, routineType } from 'types/routine';
import { routineOrderType } from 'types/routine_order';

export const RoutineContext = createContext<{
  routines: routineType[] | undefined;
  setRoutines: Dispatch<SetStateAction<routineType[] | undefined>>;
  routineOrder: routineOrderType | null | undefined;
  setRoutineOrder: Dispatch<SetStateAction<routineOrderType | null | undefined>>;
  routineStatus: routineStatusType | null;
  setRoutineStatus: Dispatch<SetStateAction<routineStatusType | null>>;
}>({
  routines: undefined,
  setRoutines: null as unknown as Dispatch<SetStateAction<routineType[] | undefined>>,
  routineOrder: undefined,
  setRoutineOrder: null as unknown as Dispatch<SetStateAction<routineOrderType | null | undefined>>,
  routineStatus: null,
  setRoutineStatus: null as unknown as Dispatch<SetStateAction<routineStatusType | null>>,
});

type RoutineContextProviderProps = {
  children: React.ReactNode;
};

const RoutineContextProvider = (props: RoutineContextProviderProps) => {
  const [routines, setRoutines] = useState<routineType[] | undefined>();
  const [routineOrder, setRoutineOrder] = useState<routineOrderType | null | undefined>();
  const [routineStatus, setRoutineStatus] = useState<routineStatusType | null>(null);

  return (
    <RoutineContext.Provider
      value={{ routines, setRoutines, routineOrder, setRoutineOrder, routineStatus, setRoutineStatus }}
    >
      {props.children}
    </RoutineContext.Provider>
  );
};

export default RoutineContextProvider;
