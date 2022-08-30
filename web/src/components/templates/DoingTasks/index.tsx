import { useContext, useEffect, useState } from 'react';

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
import { sortTasks } from 'lib/models/task';

type DoingTasksProps = {};

const DoingTasks = (props: DoingTasksProps) => {
  const theme = useTheme();

  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[] | null>(null);
  const [taskOrder, setTaskOrder] = useState<taskOrderType | null>(null);
  const [sortedTasks, setSortedTasks] = useState<taskType[] | null>(null);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, {
      statusID: kanbanStatusConst.doing,
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const unsubscribe = getTaskOrder(
      user!.uid,
      kanbanStatusConst.doing,
      setTaskOrder,
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!tasks) return;
    setSortedTasks(sortTasks(tasks, taskOrder));
  }, [tasks, taskOrder]);

  if (sortedTasks === null) return <></>;

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
        <AddTaskForm
          kanbanStatusID={kanbanStatusConst.doing}
          tasks={sortedTasks}
          taskOrder={taskOrder}
        />
        <Box sx={{ mt: sortedTasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={sortedTasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default DoingTasks;
