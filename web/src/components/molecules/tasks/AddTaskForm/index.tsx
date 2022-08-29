import { serverTimestamp } from 'firebase/firestore';
import { runTransaction } from 'firebase/firestore';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

import { UtilContext } from 'pages/_app';

import { addTaskType, updateTaskType } from 'types/task';

import { addTask, addTaskTx, updateTask, updateTaskTx } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';
import { db } from 'lib/infrastructure/firebase';

type AddTaskFormProps = {
  kanbanStatusID: string;
  lastTaskID: string;
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
      nextID: '',
      statusID: props.kanbanStatusID,
      title: inputValue.trim(),
      isDone: props.kanbanStatusID === kanbanStatusConst.done ? true : false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await runTransaction(db, async (tx) => {
        const newDoc = await addTaskTx(tx, user!.uid, newTask);
        if (newDoc === undefined) throw 'failed to add';
        if (props.lastTaskID !== '' && newDoc !== undefined) {
          const editTask: updateTaskType = { nextID: newDoc.id };
          updateTaskTx(tx, user!.uid, props.lastTaskID, editTask);
        }
      });
      console.log('Transaction successfully committed!');
      setInputValue('');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
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
