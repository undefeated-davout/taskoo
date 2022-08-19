import { addDoc, collection } from 'firebase/firestore';

import TextField from '@mui/material/TextField';

type AddTaskFormProps = {};

const AddTaskForm = (props: AddTaskFormProps) => {
  /** ボタン押下orEnterで呼ばれる */
  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    console.log('Click');
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
