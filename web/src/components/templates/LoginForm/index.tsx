import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Box from '@mui/material/Box';

import { preparedFirebase } from 'lib/infrastructure/firebase';

type LoginFormProps = {};

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/focus',
  signInOptions: [preparedFirebase.auth.EmailAuthProvider.PROVIDER_ID],
};

const LoginForm = (props: LoginFormProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={preparedFirebase.auth()}
      />
    </Box>
  );
};

export default LoginForm;
