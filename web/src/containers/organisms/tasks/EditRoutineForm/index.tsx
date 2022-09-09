import { useContext, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import { UserContext } from 'pages/_app';

import { routineType, updateRoutineType } from 'types/routine';

import { deleteRoutineWithOrder, updateRoutine } from 'lib/api/routine';
import { RoutineContext } from 'lib/contexts/RoutineContextProvider';

type EditRoutineFormProps = {
  routine: routineType;
  isOpen: boolean;
  onClose: VoidFunction;
};

const EditRoutineForm = (props: EditRoutineFormProps) => {
  const { user } = useContext(UserContext);
  const { setRoutines, setRoutineOrder, routineStatus } = useContext(RoutineContext);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(props.routine.title.trim());
  }, [props.isOpen, props.routine.title]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Escape') return;
    handleClose();
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClose = () => {
    if (routineStatus === null) return;
    if (inputValue.trim() === '') return;

    const updatedRoutine: updateRoutineType = { title: inputValue.trim() };

    setRoutines(undefined);
    updateRoutine(user!.uid, props.routine.id, updatedRoutine);

    props.onClose();
  };

  const handleDelete = () => {
    if (routineStatus === null) return;
    setRoutines(undefined);
    setRoutineOrder(undefined);
    deleteRoutineWithOrder(user!.uid, props.routine.id, routineStatus.routineOrderID, routineStatus.sortedRoutines);
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

export default EditRoutineForm;
