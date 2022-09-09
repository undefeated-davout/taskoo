import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { useRoutineStatus } from 'hooks/useRoutineStatus';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';

import AddRoutineForm from 'containers/molecules/tasks/AddRoutineForm';
import RoutineList from 'containers/organisms/tasks/RoutineList';

type RoutineConsoleProps = {};

const RoutineConsole = (props: RoutineConsoleProps) => {
  const theme = useTheme();
  const routineStatus = useRoutineStatus();
  if (routineStatus === null) return <></>;

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

        <Box sx={{ mt: routineStatus.sortedRoutines.length === 0 ? 0 : 3 }} />
        <RoutineList routines={routineStatus.sortedRoutines} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default RoutineConsole;
