import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/tasks/AddTaskForm';
import TaskList from 'components/organisms/tasks/TaskList';

import { taskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

import { getTasks } from 'lib/api/task';
import { getTaskOrder } from 'lib/api/task_order';
import { kanbanStatusConst } from 'lib/constants/kanban';
import { sortStatusIDTasks } from 'lib/models/task';
import { kanbanTaskState } from 'lib/recoil/kanbanTask';

type DoingTasksProps = {};

const DoingTasks = (props: DoingTasksProps) => {
  const theme = useTheme();
  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[] | null>(null);
  const [taskOrder, setTaskOrder] = useState<taskOrderType | null>(null);
  const [kanbanTask, setKanbanTask] = useRecoilState(kanbanTaskState);

  useEffect(() => setKanbanTask(null), [setKanbanTask]);
  useEffect(() => {
    const tasksUnsubscribe = getTasks(user!.uid, setTasks, {});
    const taskOrderUnsubscribe = getTaskOrder(user!.uid, setTaskOrder);
    return () => {
      tasksUnsubscribe();
      taskOrderUnsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (!tasks) return;
    const sortedStatusIDTasks = sortStatusIDTasks(tasks, taskOrder);
    setKanbanTask({
      taskOrderID: taskOrder?.id ?? '',
      statusIDTasks: sortedStatusIDTasks,
    });
  }, [tasks, taskOrder, setKanbanTask]);

  if (tasks === null || kanbanTask === null) return <></>;

  const doingTasks = kanbanTask.statusIDTasks[kanbanStatusConst.doing] ?? [];
  const doneTasks = kanbanTask.statusIDTasks[kanbanStatusConst.done] ?? [];

  return (
    <HorizontalCenterContainerBox>
      <Card
        sx={{
          mt: 4,
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
        }}
      >
        <Box sx={{ mt: 1 }} />
        <AddTaskForm kanbanStatusID={kanbanStatusConst.doing} />
        <Box sx={{ mt: doingTasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={doingTasks} />
        <Box sx={{ mt: doneTasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={doneTasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default DoingTasks;
