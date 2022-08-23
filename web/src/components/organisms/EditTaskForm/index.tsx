import { useContext, useState } from 'react';

import { serverTimestamp } from 'firebase/firestore';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import { UtilContext } from 'pages/_app';

import { taskType, updateTaskType } from 'types/task';

import { updateTask } from 'lib/api/task';

type EditTaskFormProps = {
  task: taskType;
  isOpen: boolean;
  onClose: VoidFunction;
};

const EditTaskForm = (props: EditTaskFormProps) => {
  const { user } = useContext(UtilContext);
  const [inputValue, setInputValue] = useState(props.task.title);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const cancel = () => {
    console.log('cancel!!');
    props.onClose();
  };

  const submit = () => {
    if (inputValue.trim() === '') return;

    const editTask: updateTaskType = {
      title: inputValue.trim(),
    };

    updateTask(user!.uid, props.task.id, editTask);

    props.onClose();
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={cancel}>
        <DialogContent sx={{ width: 500, maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="TITLE"
            variant="outlined"
            autoFocus
            margin="dense"
            value={inputValue}
            onChange={handleTextFieldChange}
          />
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button color="primary" variant="contained" onClick={submit}>
            SAVE
          </Button>
          <Button onClick={cancel}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTaskForm;
