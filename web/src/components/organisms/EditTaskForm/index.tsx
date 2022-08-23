import { useContext, useEffect, useState } from 'react';

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
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Escape') return;
    submit();
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submit = () => {
    if (inputValue.trim() === '') return;

    const editTask: updateTaskType = {
      title: inputValue.trim(),
    };

    updateTask(user!.uid, props.task.id, editTask);

    props.onClose();
  };

  useEffect(() => {
    setInputValue(props.task.title.trim());
  }, [props.isOpen, props.task.title]);

  return (
    <div>
      <Dialog open={props.isOpen} onClose={submit} onKeyDown={handleKeyDown}>
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
          <Button onClick={submit}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTaskForm;
