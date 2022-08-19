import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import TextField from '@mui/material/TextField';

import { NewTaskType } from 'types/task';

import { db } from 'lib/infrastructure/firebase';

type AddTaskFormProps = {};

const AddTaskForm = (props: AddTaskFormProps) => {
  /** ボタン押下orEnterで呼ばれる */
  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    try {
      const taskColloctionRef = collection(
        db,
        'users',
        '4FLibj7aErYG54Fe0G0fdsSbt5q1',
        'tasks',
      );
      const task: NewTaskType = {
        order_num: 0,
        title: 'test',
        isDone: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      setDoc(doc(taskColloctionRef), task);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    handleSubmit(e);
  };

  return (
    <TextField
      label="ENTER YOUR TASK"
      variant="outlined"
      fullWidth
      onKeyDown={handleKeyDown}
      autoComplete="off"
    />
  );
};

export default AddTaskForm;
