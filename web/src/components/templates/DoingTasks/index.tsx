import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/tasks/AddTaskForm';
import TaskList from 'components/organisms/tasks/TaskList';

import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';
import { lastTaskID } from 'lib/models/task';

type DoingTasksProps = {};

const DoingTasks = (props: DoingTasksProps) => {
  const theme = useTheme();

  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[] | null>(null);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, {
      statusID: kanbanStatusConst.doing,
    });
    return () => unsubscribe();
  }, [user]);

  if (tasks === null) return <></>;

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
          lastTaskID={lastTaskID(tasks)}
        />
        <Box sx={{ mt: tasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={tasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default DoingTasks;
