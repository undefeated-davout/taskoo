import { useContext, useState } from 'react';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeselectIcon from '@mui/icons-material/Deselect';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UserContext } from 'pages/_app';

import { useKanbanTask } from 'hooks/useKanbanTask';
import { useRoutineStatus } from 'hooks/useRoutineStatus';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import CtmSnackbar from 'components/molecules/common/CtmSnackbar';

import AddRoutineForm from 'containers/molecules/tasks/AddRoutineForm';
import MessageDialog from 'containers/organisms/common/MessageDialog';
import RoutineList from 'containers/organisms/tasks/RoutineList';

import { RoutineContext } from 'lib/contexts/RoutineContextProvider';
import { copyRoutines } from 'lib/models/routine';

type RoutineConsoleProps = {};

const RoutineConsole = (props: RoutineConsoleProps) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const { setRoutineStatus } = useContext(RoutineContext);
  const [isOpenCopyForm, setIsOpenCopyForm] = useState(false);
  const [stateMessageDialog, setStateMessageDialog] = useState({ content: '', isOpen: false });
  const [stateSnackbar, setStateSnackbar] = useState({ content: '', isOpen: false });
  const routineStatus = useRoutineStatus();
  const kanbanTask = useKanbanTask();
  if (routineStatus === null || kanbanTask === null) return <></>;

  const userID = user!.uid;

  const handleCheckAll = (isOn: boolean) => {
    setRoutineStatus((prev) => {
      const sortedRoutines = prev?.sortedRoutines ?? [];
      return {
        routineOrderID: prev?.routineOrderID ?? '',
        sortedRoutines: sortedRoutines,
        checkedIDs: isOn ? sortedRoutines.map((routine) => routine.id) : [],
      };
    });
  };

  const handleCopy = async () => {
    // 選択なしならばエラーメッセージ表示
    if (routineStatus.checkedIDs.length === 0) {
      setStateMessageDialog({ content: 'CHECK ON ROUTINES TO COPY.', isOpen: true });
      return;
    }
    await copyRoutines(
      routineStatus.sortedRoutines,
      routineStatus.checkedIDs,
      kanbanTask.statusIDTasks,
      userID,
      kanbanTask.taskOrderID,
    );
    setStateSnackbar({ content: 'REGISTERD', isOpen: true });
  };

  return (
    <>
      <HorizontalCenterContainerBox>
        <Box sx={{ width: '100%', maxWidth: 359 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* 全選択ボタン */}
            <Button variant="contained" onClick={() => handleCheckAll(true)}>
              <SelectAllIcon />
            </Button>
            <Button variant="contained" onClick={() => handleCheckAll(false)} sx={{ ml: 1 }}>
              <DeselectIcon />
            </Button>
            {/* コピーボタン */}
            <Button variant="contained" onClick={() => setIsOpenCopyForm(true)} sx={{ ml: 1, pl: 1.4 }}>
              <ArrowRightAltIcon />
              DOING
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

      {/* DOINGコピー確認用ダイアログ */}
      <MessageDialog
        content={`COPY CHECKED CARDS TO "DOING"?`}
        isOpen={isOpenCopyForm}
        onClickOK={handleCopy}
        onCancel={() => setIsOpenCopyForm(false)}
      />
      {/* OKのみメッセージボックス表示 */}
      <MessageDialog
        content={stateMessageDialog.content}
        isOpen={stateMessageDialog.isOpen}
        onClickOK={() => setStateMessageDialog({ content: '', isOpen: false })}
      />
      <CtmSnackbar
        content={stateSnackbar.content}
        open={stateSnackbar.isOpen}
        onClose={() => setStateSnackbar({ content: '', isOpen: false })}
      />
    </>
  );
};

export default RoutineConsole;
