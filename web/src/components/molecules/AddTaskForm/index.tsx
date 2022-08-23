import { useContext, useState } from 'react';

import { serverTimestamp } from 'firebase/firestore';

import TextField from '@mui/material/TextField';

import { UtilContext } from 'pages/_app';

import { addTaskType } from 'types/task';

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

    if (inputValue.trim() === '') return;

    const newTask: addTaskType = {
      order_num: 0,
      title: inputValue.trim(),
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
