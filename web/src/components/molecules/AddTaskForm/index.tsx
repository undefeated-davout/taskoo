import { serverTimestamp } from 'firebase/firestore';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

import { UtilContext } from 'pages/_app';

import { addTaskType } from 'types/task';

import { addTask } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';

type AddTaskFormProps = {
  kanbanStatusID: string;
  isMini?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const AddTaskForm = (props: AddTaskFormProps) => {
  const { user } = useContext(UtilContext);
  const [inputValue, setInputValue] = useState('');

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    if (inputValue.trim() === '') return;

    const newTask: addTaskType = {
      orderNum: 0,
      statusID: props.kanbanStatusID,
      title: inputValue.trim(),
      isDone: props.kanbanStatusID === kanbanStatusConst.done ? true : false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    addTask(user!.uid, newTask);
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
