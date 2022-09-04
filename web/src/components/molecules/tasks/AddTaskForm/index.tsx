import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

import { KanbanTaskContext, UserContext } from 'pages/_app';

import { addTaskType } from 'types/task';

import { addTaskWithOrder } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';

type AddTaskFormProps = {
  kanbanStatusID: string;
  isMini?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const AddTaskForm = (props: AddTaskFormProps) => {
  const { user } = useContext(UserContext);
  const { kanbanTask } = useContext(KanbanTaskContext);

  const [inputValue, setInputValue] = useState('');

  if (user === null) return <></>;
  if (kanbanTask === null) return <></>;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    if (inputValue.trim() === '') return;

    const newTask: addTaskType = {
      statusID: props.kanbanStatusID,
      prevStatusID:
        props.kanbanStatusID === kanbanStatusConst.done
          ? kanbanStatusConst.doing
          : '',
      title: inputValue.trim(),
      isDone: props.kanbanStatusID === kanbanStatusConst.done ? true : false,
    };

    addTaskWithOrder(
      user.uid,
      newTask,
      kanbanTask.taskOrderID,
      kanbanTask.statusIDTasks,
    );
    setInputValue('');
  };

  return (
    <TextField
      label="ENTER YOUR TASK"
      variant="outlined"
      fullWidth
      autoComplete="off"
      autoFocus
      size={props.isMini ? 'small' : 'medium'}
      value={inputValue}
      onChange={handleTextFieldChange}
      onKeyDown={handleKeyDown}
      onBlur={props.onBlur}
    />
  );
};

export default AddTaskForm;
