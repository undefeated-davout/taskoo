import { useState } from 'react';

import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { useRoutineStatus } from 'hooks/useRoutineStatus';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';

import AddRoutineForm from 'containers/molecules/tasks/AddRoutineForm';
import RoutineCopyDialog from 'containers/organisms/tasks/RoutineCopyDialog';
import RoutineList from 'containers/organisms/tasks/RoutineList';

type RoutineConsoleProps = {};

const RoutineConsole = (props: RoutineConsoleProps) => {
  const theme = useTheme();
  const [isOpenCopyForm, setIsOpenCopyForm] = useState(false);
  const routineStatus = useRoutineStatus();
  if (routineStatus === null) return <></>;

  return (
    <>
      <HorizontalCenterContainerBox>
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          {/* コピーボタン */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={() => setIsOpenCopyForm(true)}>
              <FileCopyOutlinedIcon />
            </Button>
          </Box>

          {/* ルーティンカード本体 */}
          <Card
            sx={{
              mt: 1,
              p: 2,
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
        </Box>
      </HorizontalCenterContainerBox>

      <RoutineCopyDialog
        isOpen={isOpenCopyForm}
        onCopy={() => console.log('copy!!')}
        onClose={() => setIsOpenCopyForm(false)}
      />
    </>
  );
};

export default RoutineConsole;
