import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UserContext } from 'pages/_app';

import { useKanbanTask } from 'hooks/useKanbanTask';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import CtmSnackbar from 'components/molecules/common/CtmSnackbar';

import AddTaskForm from 'containers/molecules/tasks/AddTaskForm';
import MessageDialog from 'containers/organisms/common/MessageDialog';
import TaskList from 'containers/organisms/tasks/TaskList';

import { bulkDeleteTaskWithOrder } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/task';

type DoingTasksProps = {};

const DoingTasks = (props: DoingTasksProps) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [stateMessageDialog, setStateMessageDialog] = useState({ content: '', isOpen: false });
  const [stateSnackbar, setStateSnackbar] = useState({ content: '', isOpen: false });

  const kanbanTask = useKanbanTask();
  if (kanbanTask === null) return <></>;

  const userID = user!.uid;

  const doingTasks = kanbanTask.statusIDTasks[kanbanStatusConst.doing] ?? [];
  const doingUnCheckedTasks = doingTasks.filter((task) => !task.isChecked);
  const doingCheckedTasks = doingTasks.filter((task) => task.isChecked);

  const handleDeleteRoutines = () => {
    const routines = doingTasks.filter((task) => task.routineID);
    console.log('routines', routines);
    bulkDeleteTaskWithOrder(userID, routines, kanbanTask.taskOrderID, kanbanTask.statusIDTasks);
    setStateSnackbar({ content: 'DELETED', isOpen: true });
  };

  return (
    <>
      <HorizontalCenterContainerBox>
        <Box sx={{ width: '100%', maxWidth: 359 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* ルーティン全削除ボタン */}
            <Button
              variant="contained"
              onClick={() => setStateMessageDialog({ content: 'DO YOU DELETE ALL ROUTINE TASKS?', isOpen: true })}
            >
              DELETE ROUTINES
            </Button>
          </Box>

          <Card
            sx={{
              mt: 1,
              p: 2,
              maxWidth: 359,
              width: '100%',
              backgroundColor: theme.palette.action.disabledBackground,
            }}
          >
            <Box sx={{ mt: 1 }} />
            <AddTaskForm kanbanStatusID={kanbanStatusConst.doing} />
            <Box sx={{ mt: 1 }} />

            <Box sx={{ mt: doingUnCheckedTasks.length === 0 ? 0 : 3 }} />
            <TaskList displayToolButton={true} tasks={doingUnCheckedTasks} />

            <Box sx={{ mt: doingCheckedTasks.length === 0 ? 0 : 3 }} />
            <TaskList displayToolButton={true} tasks={doingCheckedTasks} />
          </Card>
        </Box>
      </HorizontalCenterContainerBox>

      {/* ルーティン削除確認用ダイアログ */}
      <MessageDialog
        content={stateMessageDialog.content}
        isOpen={stateMessageDialog.isOpen}
        onClickOK={handleDeleteRoutines}
        onCancel={() => setStateMessageDialog({ content: '', isOpen: false })}
      />
      <CtmSnackbar
        content={stateSnackbar.content}
        open={stateSnackbar.isOpen}
        onClose={() => setStateSnackbar({ content: '', isOpen: false })}
      />
    </>
  );
};

export default DoingTasks;
