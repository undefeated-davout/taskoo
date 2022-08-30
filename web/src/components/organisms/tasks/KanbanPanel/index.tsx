import { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import AddTaskForm from 'components/molecules/tasks/AddTaskForm';
import TaskList from 'components/organisms/tasks/TaskList';

import { DnDItems, kanbanStatusType } from 'types/kanban';
import { taskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

import { getTasks } from 'lib/api/task';
import { getTaskOrder } from 'lib/api/task_order';
import { sortTasks } from 'lib/models/task';

type KanbanPanelProps = {
  kanbanStatus: kanbanStatusType;
  displayDeleteButton?: boolean;
};

const KanbanPanel = (props: KanbanPanelProps) => {
  const { user } = useContext(UtilContext);
  const theme = useTheme();
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [tasks, setTasks] = useState<taskType[] | null>(null);
  const [taskOrder, setTaskOrder] = useState<taskOrderType | null>(null);
  const [sortedTasks, setSortedTasks] = useState<taskType[] | null>(null);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, {
      statusID: props.kanbanStatus.id,
    });
    return () => unsubscribe();
  }, [user, props.kanbanStatus.id]);

  useEffect(() => {
    const unsubscribe = getTaskOrder(
      user!.uid,
      props.kanbanStatus.id,
      setTaskOrder,
    );
    return () => unsubscribe();
  }, [user, props.kanbanStatus.id]);

  useEffect(() => {
    if (!tasks) return;
    setSortedTasks(sortTasks(tasks, taskOrder));
  }, [tasks, taskOrder]);

  if (sortedTasks === null) return <></>;

  // // --- ドロップ設定 ---
  // const [, drop] = useDrop(() => ({
  //   accept: DnDItems.Task,
  //   drop: () => ({ panelID: props.kanbanStatus.id }),
  // }));

  return (
    <Card
      // ref={drop}
      sx={{
        width: 280,
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
              <Typography sx={{ fontSize: 14, fontWeight: 100 }}>
                ADD TASK
              </Typography>
            </Button>
          )
        }
        title={
          <Typography sx={{ ml: 0.5, fontSize: 14, fontWeight: 100 }}>
            {props.kanbanStatus.name}
          </Typography>
        }
        sx={{ m: 0, p: 0 }}
      />

      {/* タスク入力欄 */}
      {isOpenAddForm && (
        <>
          <Box sx={{ mt: 2 }} />
          <AddTaskForm
            kanbanStatusID={props.kanbanStatus.id}
            tasks={sortedTasks}
            taskOrderID={taskOrder?.id ?? ''}
            isMini={true}
            onBlur={() => setIsOpenAddForm(false)}
          />
        </>
      )}

      {/* タスクリスト */}
      <TaskList
        isMini={true}
        displayDeleteButton={props.displayDeleteButton}
        tasks={sortedTasks}
        taskOrderID={taskOrder?.id ?? ''}
      />
    </Card>
  );
};

export default KanbanPanel;
