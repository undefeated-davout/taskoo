import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import CenterContainerBox from 'components/atoms/CenterContainerBox';
import TaskList from 'components/organisms/TaskList';

type TasksProps = {};

const Tasks = (props: TasksProps) => {
  const theme = useTheme();

  return (
    <CenterContainerBox>
      <Card
        sx={{
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
        }}
      >
        <TaskList></TaskList>
      </Card>
    </CenterContainerBox>
  );
};

export default Tasks;
