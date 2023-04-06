import { KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type MessageDialogProps = {
  content: string;
  isOpen: boolean;
  onClickOK: VoidFunction;
  onCancel?: VoidFunction;
};

const MessageDialog = (props: MessageDialogProps) => {
  const handleOK = () => {
    props.onClickOK();
    handleClose();
  };
  const handleClose = () => {
    if (props.onCancel) {
      props.onCancel();
    } else {
      props.onClickOK();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleOK();
    }
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} onKeyDown={handleKeyDown}>
        <DialogContent sx={{ width: 500, maxWidth: '100%' }}>{props.content}</DialogContent>

        <DialogActions sx={{ mr: 2, mb: 1 }}>
          {props.onCancel && <Button onClick={handleClose}>CANCEL</Button>}
          <Button variant="contained" onClick={handleOK}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MessageDialog;
