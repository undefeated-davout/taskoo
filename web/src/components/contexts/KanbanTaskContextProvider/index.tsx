import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { kanbanTaskStateType, taskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

export const KanbanTaskContext = createContext<{
  tasks: taskType[] | undefined;
  setTasks: Dispatch<SetStateAction<taskType[] | undefined>>;
  taskOrder: taskOrderType | null | undefined;
  setTaskOrder: Dispatch<SetStateAction<taskOrderType | null | undefined>>;
  kanbanTask: kanbanTaskStateType | null;
  setKanbanTask: Dispatch<SetStateAction<kanbanTaskStateType | null>>;
}>({
  tasks: undefined,
  setTasks: null as unknown as Dispatch<SetStateAction<taskType[] | undefined>>,
  taskOrder: undefined,
  setTaskOrder: null as unknown as Dispatch<SetStateAction<taskOrderType | null | undefined>>,
  kanbanTask: null,
  setKanbanTask: null as unknown as Dispatch<SetStateAction<kanbanTaskStateType | null>>,
});

type KanbanTaskContextProviderProps = {
  children: React.ReactNode;
};

const KanbanTaskContextProvider = (props: KanbanTaskContextProviderProps) => {
  const [tasks, setTasks] = useState<taskType[] | undefined>();
  const [taskOrder, setTaskOrder] = useState<taskOrderType | null | undefined>();
  const [kanbanTask, setKanbanTask] = useState<kanbanTaskStateType | null>(null);

  return (
    <KanbanTaskContext.Provider value={{ tasks, setTasks, taskOrder, setTaskOrder, kanbanTask, setKanbanTask }}>
      {props.children}
    </KanbanTaskContext.Provider>
  );
};

export default KanbanTaskContextProvider;
