import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';

import AddTaskForm from 'containers/molecules/tasks/AddTaskForm';
import TaskList from 'containers/organisms/tasks/TaskList';

import { kanbanStatusConst } from 'lib/constants/kanban';
import { useKanbanTask } from 'lib/customHooks/useKanbanTask';

type RoutineProps = {};

const Routine = (props: RoutineProps) => {
  const theme = useTheme();

  const kanbanTask = useKanbanTask();
  if (kanbanTask === null) return <></>;

  const doingTasks = kanbanTask.statusIDTasks[kanbanStatusConst.doing] ?? [];

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
        <AddTaskForm kanbanStatusID={kanbanStatusConst.doing} />
        <Box sx={{ mt: 1 }} />

        <Box sx={{ mt: doingTasks.length === 0 ? 0 : 3 }} />
        <TaskList displayToolButton={true} tasks={doingTasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default Routine;
