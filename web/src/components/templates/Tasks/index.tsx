import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/AddTaskForm';
import TaskList from 'components/organisms/TaskList';

type TasksProps = {};

const Tasks = (props: TasksProps) => {
  const theme = useTheme();

  return (
    <HorizontalCenterContainerBox>
      <Card
        sx={{
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
        }}
      >
        <AddTaskForm></AddTaskForm>
        <Box sx={{ mt: 1 }}></Box>
        <TaskList></TaskList>
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default Tasks;
