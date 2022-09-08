import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UserContext } from 'pages/_app';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';

import AddRoutineForm from 'containers/molecules/tasks/AddRoutineForm';
import RoutineList from 'containers/organisms/tasks/RoutineList';

import { routineType } from 'types/routine';

import { getRoutines } from 'lib/api/routine';

type RoutineConsoleProps = {};

const RoutineConsole = (props: RoutineConsoleProps) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [routines, setRoutines] = useState<routineType[] | undefined>(undefined);

  const userID = user!.uid;

  useEffect(() => {
    const routinesUnsubscribe = getRoutines(userID, setRoutines);
    return () => {
      routinesUnsubscribe();
    };
  }, [setRoutines, userID]);

  if (routines === undefined) return <></>;

  return (
    <HorizontalCenterContainerBox>
      <Card
        sx={{
          mt: 4,
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
          outline: `2px solid ${theme.palette.success.main}`,
        }}
      >
        <Box sx={{ mt: 1 }} />
        <AddRoutineForm />
        <Box sx={{ mt: 1 }} />

        <Box sx={{ mt: routines.length === 0 ? 0 : 3 }} />
        <RoutineList routines={routines} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default RoutineConsole;
