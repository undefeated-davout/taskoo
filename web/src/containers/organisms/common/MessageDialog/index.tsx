import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type MessageDialogProps = {
  content: string;
  isOpen: boolean;
  onClose: VoidFunction;
};

const MessageDialog = (props: MessageDialogProps) => {
  const handleOK = () => {
    props.onClose();
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogContent sx={{ width: 500, maxWidth: '100%' }}>{props.content}</DialogContent>

        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button variant="contained" onClick={handleOK}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MessageDialog;
