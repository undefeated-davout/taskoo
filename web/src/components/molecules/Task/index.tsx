import { ChangeEvent, useContext, useState } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { UtilContext } from 'pages/_app';

import BaseCheckbox from 'components/atoms/BaseCheckbox';
import EditTaskForm from 'components/organisms/EditTaskForm';

import { taskType, updateTaskType } from 'types/task';

import { deleteTask, updateTask } from 'lib/api/task';

type TaskProps = {
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UtilContext);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const editTask: updateTaskType = { isDone: event.target.checked };
    updateTask(user!.uid, props.task.id, editTask);
  };

  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTask(user!.uid, props.task.id);
  };

  return (
    <>
      {/* タスク要素 */}
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          '&:hover': { cursor: 'pointer' },
        }}
        onClick={() => setIsOpenForm(true)}
      >
        <BaseCheckbox
          checked={props.task.isDone}
          onChange={handleChangeCheckbox}
        />

        <Button
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={() => setIsOpenForm(true)}
        >
          <Typography
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
            }}
          >
            {props.task.title}
          </Typography>
        </Button>

        <CardActions sx={{ pl: 0 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ maxWidth: 36, minWidth: 36 }}
            onClick={handleDeleteButton}
          >
            <DeleteOutlineIcon sx={{ m: 0 }} />
          </Button>
        </CardActions>
      </Card>

      {/* 詳細編集フォーム */}
      <EditTaskForm
        task={props.task}
        isOpen={isOpenForm}
        onClose={() => setIsOpenForm(false)}
      />
    </>
  );
};

export default Task;
