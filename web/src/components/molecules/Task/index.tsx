import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material/styles';

import BaseCheckbox from 'components/atoms/BaseCheckbox';

import { TaskType } from 'types/task';

import { DeleteTask } from 'lib/functions/task';

type TaskProps = {
  task: TaskType;
};

const Task = (props: TaskProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BaseCheckbox />
      {props.task.title}

      <CardActions sx={{ marginLeft: 'auto' }}>
        <Button
          variant="contained"
          sx={{
            maxWidth: 36,
            minWidth: 36,
            backgroundColor: theme.palette.grey[500],
            '&:hover': {
              backgroundColor: theme.palette.grey[400],
            },
          }}
          onClick={() => DeleteTask(props.task.id)}
        >
          <DeleteOutlineIcon sx={{ m: 0 }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
