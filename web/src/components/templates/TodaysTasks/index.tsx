import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/AddTaskForm';
import TaskList from 'components/organisms/TaskList';

type TodaysTasksProps = {};

const TodaysTasks = (props: TodaysTasksProps) => {
  const theme = useTheme();

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
        <Box sx={{ mt: 1 }} />
        <TaskList />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default TodaysTasks;
