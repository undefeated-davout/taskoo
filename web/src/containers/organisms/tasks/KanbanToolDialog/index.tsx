import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

type KanbanToolDialogProps = {
  displayDeleteButton: boolean;
  isOpen: boolean;
  onClose: (state: KanbanToolDialogReturnProps) => void;
};

export type KanbanToolDialogReturnProps = {
  displayDeleteButton: boolean;
};

const KanbanToolDialog = (props: KanbanToolDialogProps) => {
  const [state, setState] = useState<KanbanToolDialogReturnProps>({
    displayDeleteButton: props.displayDeleteButton,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClose = () => {
    props.onClose(state);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogContent sx={{ width: 500, maxWidth: '100%' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name="displayDeleteButton"
                  color="success"
                  checked={state.displayDeleteButton}
                  onChange={handleChange}
                />
              }
              label="DISPLAY DELETE BUTTON"
            />
          </FormGroup>
        </DialogContent>

        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KanbanToolDialog;
