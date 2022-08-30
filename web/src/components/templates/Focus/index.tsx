import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import CenterContainerBox from 'components/atoms/CenterContainerBox';
import Task from 'components/molecules/tasks/Task';

import { taskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

import { getTasks } from 'lib/api/task';
import { getTaskOrder } from 'lib/api/task_order';
import { kanbanStatusConst } from 'lib/constants/kanban';
import { sortStatusIDTasks } from 'lib/models/task';
import { kanbanTaskState } from 'lib/recoil/kanbanTask';

type FocusProps = {};

const Focus = (props: FocusProps) => {
  const theme = useTheme();
  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[] | null>(null);
  const [taskOrder, setTaskOrder] = useState<taskOrderType | null>(null);
  const [kanbanTask, setKanbanTask] = useRecoilState(kanbanTaskState);

  useEffect(() => setKanbanTask(null), []);
  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, { isDone: false });
    return () => unsubscribe();
  }, [user]);
  useEffect(() => {
    const unsubscribe = getTaskOrder(user!.uid, setTaskOrder);
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!tasks) return;
    const sortedStatusIDTasks = sortStatusIDTasks(tasks, taskOrder);
    setKanbanTask({
      taskOrderID: taskOrder?.id ?? '',
      statusIDTasks: sortedStatusIDTasks,
    });
  }, [tasks, taskOrder, setKanbanTask]);

  if (tasks === null || kanbanTask === null) return <></>;

  const sortedTasks = kanbanTask.statusIDTasks[kanbanStatusConst.doing] ?? [];

  return (
    <CenterContainerBox>
      <Card
        sx={{
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
        }}
      >
        {sortedTasks.length === 0 ? (
          <Typography variant="h6" sx={{ fontWeight: 100 }}>
            {'NO TASKS IN "DOING".'}
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 100 }}>
            FOCUS ON THE TASK.
            <br />
            REMAINING: {sortedTasks.length}
          </Typography>
        )}

        {sortedTasks.length > 0 && taskOrder && (
          <>
            <Box sx={{ mt: 2 }}></Box>
            <Task isMini={false} task={sortedTasks[0]} />
          </>
        )}
      </Card>
    </CenterContainerBox>
  );
};

export default Focus;
