import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TaskList from 'components/organisms/TaskList';

type TasksProps = {};

const Tasks = (props: TasksProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <TaskList></TaskList>
      </Box>
    </Box>
  );
};

export default Tasks;
