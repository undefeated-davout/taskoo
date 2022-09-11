import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type CtmSnackbarProps = {
  content: string;
  open: boolean;
  onClose: VoidFunction;
};

const CtmSnackbar = (props: CtmSnackbarProps) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    props.onClose();
  };

  return (
    <Snackbar open={props.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props.content}
      </Alert>
    </Snackbar>
  );
};

export default CtmSnackbar;
