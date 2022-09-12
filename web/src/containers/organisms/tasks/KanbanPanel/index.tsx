import { useContext, useState } from 'react';
import { useDrop } from 'react-dnd';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import AddTaskForm from 'containers/molecules/tasks/AddTaskForm';
import TaskList from 'containers/organisms/tasks/TaskList';

import { DnDItems, kanbanStatusType } from 'types/task';
import { taskType } from 'types/task';

import { KanbanTaskContext } from 'lib/contexts/KanbanTaskContextProvider';

type KanbanPanelProps = {
  kanbanStatus: kanbanStatusType;
  tasks: taskType[];
  displayToolButton: boolean;
};

const KanbanPanel = (props: KanbanPanelProps) => {
  const theme = useTheme();
  const { kanbanTask } = useContext(KanbanTaskContext);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  // --- ドロップ設定 ---
  const [, drop] = useDrop(() => ({
    accept: DnDItems.Task,
    drop: (_, monitor) => {
      if (monitor.didDrop()) return;
      return {
        panelID: props.kanbanStatus.id,
        kanbanTask: kanbanTask,
      };
    },
  }));

  if (kanbanTask === null) return <></>;

  return (
    <Card
      ref={drop}
      sx={{
        width: 300,
        [theme.breakpoints.down('sm')]: { width: 359 },
        minHeight: 86,
        p: 1,
        backgroundColor: theme.palette.action.disabledBackground,
      }}
    >
      <CardHeader
        action={
          !isOpenAddForm && (
            <Button sx={{ mr: 0.5 }} onClick={() => setIsOpenAddForm(true)}>
              <AddIcon sx={{ mr: 1 }} />
              <Typography sx={{ fontSize: 14, fontWeight: 100 }}>ADD TASK</Typography>
            </Button>
          )
        }
        title={<Typography sx={{ ml: 0.5, fontSize: 14, fontWeight: 100 }}>{props.kanbanStatus.name}</Typography>}
        sx={{ m: 0, p: 0 }}
      />

      {/* タスク入力欄 */}
      {isOpenAddForm && (
        <>
          <Box sx={{ mt: 2 }} />
          <AddTaskForm
            kanbanStatusID={props.kanbanStatus.id}
            isMini={true}
            autoFocus={true}
            onBlur={() => setIsOpenAddForm(false)}
          />
        </>
      )}

      {/* タスクリスト */}
      <TaskList isMini={true} displayToolButton={props.displayToolButton} tasks={props.tasks} />
    </Card>
  );
};

export default KanbanPanel;
