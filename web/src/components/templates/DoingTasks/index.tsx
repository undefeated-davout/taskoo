import { useContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/tasks/AddTaskForm';
import TaskList from 'components/organisms/tasks/TaskList';

import { kanbanStatusConst } from 'lib/constants/kanban';
import { useKanbanTask } from 'lib/customHooks/useKanbanTask';

type DoingTasksProps = {};

const DoingTasks = (props: DoingTasksProps) => {
  const theme = useTheme();
  const { user } = useContext(UtilContext);

  const kanbanTask = useKanbanTask(user!.uid, {});
  if (kanbanTask === null) return <></>;

  const doingTasks = kanbanTask.statusIDTasks[kanbanStatusConst.doing] ?? [];
  const doneTasks = kanbanTask.statusIDTasks[kanbanStatusConst.done] ?? [];
  const doneInDoingTasks = doneTasks.filter(
    (task) => task.prevStatusID === kanbanStatusConst.doing,
  );

  return (
    <HorizontalCenterContainerBox>
      <Card
        sx={{
          mt: 4,
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
        }}
      >
        <Box sx={{ mt: 1 }} />
        <AddTaskForm kanbanStatusID={kanbanStatusConst.doing} />
        <Box sx={{ mt: doingTasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={doingTasks} />
        <Box sx={{ mt: doneInDoingTasks.length === 0 ? 1 : 3 }} />
        <TaskList tasks={doneInDoingTasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default DoingTasks;
