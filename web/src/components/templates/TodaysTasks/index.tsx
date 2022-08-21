import { UtilContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/AddTaskForm';
import TaskList from 'components/organisms/TaskList';

import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';

type TodaysTasksProps = {};

const TodaysTasks = (props: TodaysTasksProps) => {
  const theme = useTheme();

  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks);
    return () => unsubscribe();
  }, []);

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
        <AddTaskForm />
        <Box sx={{ mt: tasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={tasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default TodaysTasks;
