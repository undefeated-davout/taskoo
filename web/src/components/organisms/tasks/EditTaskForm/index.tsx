import { useContext, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import { UserContext } from 'pages/_app';

import { KanbanTaskContext } from 'components/contexts/KanbanTaskContextProvider';

import { taskType, updateTaskType } from 'types/task';

import { deleteTaskWithOrder, updateTask } from 'lib/api/task';
import { calcStatusIDTasks } from 'lib/models/task';

type EditTaskFormProps = {
  task: taskType;
  isOpen: boolean;
  onClose: VoidFunction;
};

const EditTaskForm = (props: EditTaskFormProps) => {
  const { user } = useContext(UserContext);
  const { setTasks, setTaskOrder, kanbanTask, setKanbanTask } = useContext(KanbanTaskContext);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(props.task.title.trim());
  }, [props.isOpen, props.task.title]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Escape') return;
    handleClose();
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClose = () => {
    if (kanbanTask === null) return;
    if (inputValue.trim() === '') return;

    const updatedTask: updateTaskType = { title: inputValue.trim() };
    const newStatusIDTasks = calcStatusIDTasks(
      props.task.id,
      '',
      false,
      props.task.statusID,
      props.task.statusID,
      updatedTask,
      kanbanTask.statusIDTasks,
    );
    setKanbanTask({
      taskOrderID: kanbanTask.taskOrderID,
      statusIDTasks: newStatusIDTasks,
    });
    setTasks(undefined);
    updateTask(user!.uid, props.task.id, updatedTask);

    props.onClose();
  };

  const handleDelete = () => {
    if (kanbanTask === null) return;
    setTasks(undefined);
    setTaskOrder(undefined);
    deleteTaskWithOrder(user!.uid, props.task, kanbanTask.taskOrderID, kanbanTask.statusIDTasks);
    props.onClose();
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} onKeyDown={handleKeyDown}>
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
        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button onClick={handleClose}>CLOSE</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTaskForm;
