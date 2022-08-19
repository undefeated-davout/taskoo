import { addDoc, collection } from 'firebase/firestore';

import TextField from '@mui/material/TextField';

import { db } from 'lib/infrastructure/firebase';

type AddTaskFormProps = {};

const AddTaskForm = (props: AddTaskFormProps) => {
  /** ボタン押下orEnterで呼ばれる */
  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    console.log('Click');

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', docRef.id);
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
