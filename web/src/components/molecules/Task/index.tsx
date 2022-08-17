import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import BaseCheckbox from 'components/atoms/BaseCheckbox';
import { TaskType } from 'types/task';

type TaskProps = {
  task: TaskType;
};

const Task = (props: TaskProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: '100%',
        // color: theme.palette.common.black,
        // backgroundColor: theme.palette.grey[200],
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BaseCheckbox></BaseCheckbox>
      {props.task.title}
    </Card>
  );
};

export default Task;
