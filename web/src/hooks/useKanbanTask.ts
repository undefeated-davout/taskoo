import { useContext, useEffect } from 'react';

import { UserContext } from 'pages/_app';

import { getTasks } from 'lib/api/task';
import { getTaskOrder } from 'lib/api/task_order';
import { KanbanTaskContext } from 'lib/contexts/KanbanTaskContextProvider';
import { sortStatusIDTasks } from 'lib/models/task';

export const useKanbanTask = () => {
  const { user } = useContext(UserContext);
  const { tasks, setTasks, taskOrder, setTaskOrder, kanbanTask, setKanbanTask } = useContext(KanbanTaskContext);

  const userID = user!.uid;

  // tasks, taskOrder情報取得
  useEffect(() => {
    const tasksUnsubscribe = getTasks(userID, setTasks);
    const taskOrderUnsubscribe = getTaskOrder(userID, setTaskOrder);
    return () => {
      tasksUnsubscribe();
      taskOrderUnsubscribe();
    };
  }, [setTaskOrder, setTasks, userID]);

  // tasks, taskOrder情報をもとに、statusIDごとのソート済みtasksを作成
  useEffect(() => {
    if (tasks === undefined || taskOrder === undefined) return;
    const sortedStatusIDTasks = sortStatusIDTasks(tasks, taskOrder);
    if (sortedStatusIDTasks === null) return;
    setKanbanTask({
      taskOrderID: taskOrder?.id ?? '',
      statusIDTasks: sortedStatusIDTasks,
    });
  }, [setKanbanTask, taskOrder, tasks]);

  return kanbanTask;
};
