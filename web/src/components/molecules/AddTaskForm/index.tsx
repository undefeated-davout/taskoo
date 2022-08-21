import { serverTimestamp } from 'firebase/firestore';
import { UtilContext } from 'pages/_app';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

import { newTaskType } from 'types/task';

import { addTask } from 'lib/api/task';

type AddTaskFormProps = {};

const AddTaskForm = (props: AddTaskFormProps) => {
  const { user } = useContext(UtilContext);
  const [inputValue, setInputValue] = useState('');

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    const newTask: newTaskType = {
      order_num: 0,
      title: inputValue,
      isDone: false,
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
      value={inputValue}
      onChange={handleTextFieldChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default AddTaskForm;
