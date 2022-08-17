import Box from '@mui/material/Box';
import TaskList from 'components/organisms/TaskList';
import CenterContainerBox from 'components/atoms/CenterContainerBox';

type TasksProps = {};

const Tasks = (props: TasksProps) => {
  return (
    <CenterContainerBox>
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <TaskList></TaskList>
      </Box>
    </CenterContainerBox>
  );
};

export default Tasks;
