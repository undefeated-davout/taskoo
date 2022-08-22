import { useContext } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import { UtilContext } from 'pages/_app';

import BaseCheckbox from 'components/atoms/BaseCheckbox';

import { taskType } from 'types/task';

import { deleteTask, updateTask } from 'lib/api/task';

type TaskProps = {
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UtilContext);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BaseCheckbox
        checked={props.task.isDone}
        onChange={(event) =>
          updateTask(user!.uid, props.task.id, { isDone: event.target.checked })
        }
      />
      {props.task.title}

      <CardActions sx={{ marginLeft: 'auto' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            maxWidth: 36,
            minWidth: 36,
          }}
          onClick={() => deleteTask(user!.uid, props.task.id)}
        >
          <DeleteOutlineIcon sx={{ m: 0 }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
