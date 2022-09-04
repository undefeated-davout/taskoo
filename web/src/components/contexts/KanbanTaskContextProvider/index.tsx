import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { kanbanTaskStateType } from 'types/task';

export const KanbanTaskContext = createContext<{
  kanbanTask: kanbanTaskStateType | null;
  setKanbanTask: Dispatch<SetStateAction<kanbanTaskStateType | null>>;
}>({
  kanbanTask: null,
  setKanbanTask: null as unknown as Dispatch<
    SetStateAction<kanbanTaskStateType | null>
  >,
});

type KanbanTaskContextProviderProps = {
  children: React.ReactNode;
};

const KanbanTaskContextProvider = (props: KanbanTaskContextProviderProps) => {
  const [kanbanTask, setKanbanTask] = useState<kanbanTaskStateType | null>(
    null,
  );

  return (
    <KanbanTaskContext.Provider value={{ kanbanTask, setKanbanTask }}>
      {props.children}
    </KanbanTaskContext.Provider>
  );
};

export default KanbanTaskContextProvider;
