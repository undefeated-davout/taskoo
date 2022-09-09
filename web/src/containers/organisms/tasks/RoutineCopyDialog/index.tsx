import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type RoutineCopyDialogProps = {
  isOpen: boolean;
  onCopy: VoidFunction;
  onClose: VoidFunction;
};

const RoutineCopyDialog = (props: RoutineCopyDialogProps) => {
  const handleOK = () => {
    props.onCopy();
    props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleCancel}>
        <DialogContent sx={{ width: 500, maxWidth: '100%' }}>{`COPY CHECKED CARDS TO "DOING" ?`}</DialogContent>

        <DialogActions sx={{ mt: 3, mr: 2, mb: 1 }}>
          <Button onClick={handleCancel}>CANCEL</Button>
          <Button variant="contained" onClick={handleOK}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoutineCopyDialog;
