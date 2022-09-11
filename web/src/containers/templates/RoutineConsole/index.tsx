import { useContext, useState } from 'react';

import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UserContext } from 'pages/_app';

import { useKanbanTask } from 'hooks/useKanbanTask';
import { useRoutineStatus } from 'hooks/useRoutineStatus';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';

import AddRoutineForm from 'containers/molecules/tasks/AddRoutineForm';
import MessageDialog from 'containers/organisms/common/MessageDialog';
import RoutineCopyDialog from 'containers/organisms/tasks/RoutineCopyDialog';
import RoutineList from 'containers/organisms/tasks/RoutineList';

import { copyRoutines } from 'lib/models/routine';

type RoutineConsoleProps = {};

const RoutineConsole = (props: RoutineConsoleProps) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [isOpenCopyForm, setIsOpenCopyForm] = useState(false);
  const [stateMessageDialog, setStateMessageDialog] = useState({ content: '', isOpen: false });
  const routineStatus = useRoutineStatus();
  const kanbanTask = useKanbanTask();
  if (routineStatus === null || kanbanTask === null) return <></>;

  const userID = user!.uid;

  const handleCopy = async () => {
    // 選択なしならばエラーメッセージ表示
    if (routineStatus.checkedIDs.length === 0) {
      setStateMessageDialog({ content: 'CHECK ON ROUTINES TO COPY.', isOpen: true });
      return;
    }
    copyRoutines(
      routineStatus.sortedRoutines,
      routineStatus.checkedIDs,
      kanbanTask.statusIDTasks,
      userID,
      kanbanTask.taskOrderID,
    );
  };

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

      <RoutineCopyDialog isOpen={isOpenCopyForm} onCopy={handleCopy} onClose={() => setIsOpenCopyForm(false)} />
      <MessageDialog
        content={stateMessageDialog.content}
        isOpen={stateMessageDialog.isOpen}
        onClose={() => setStateMessageDialog({ content: '', isOpen: false })}
      />
    </>
  );
};

export default RoutineConsole;
