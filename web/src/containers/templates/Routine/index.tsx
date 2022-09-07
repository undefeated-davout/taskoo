import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { useKanbanTask } from 'hooks/useKanbanTask';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';

import AddRoutineForm from 'containers/molecules/routines/AddRoutineForm';
import TaskList from 'containers/organisms/tasks/TaskList';

import { kanbanStatusConst } from 'lib/constants/kanban';

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
        <AddRoutineForm />
        <Box sx={{ mt: 1 }} />

        <Box sx={{ mt: doingTasks.length === 0 ? 0 : 3 }} />
        <TaskList displayToolButton={true} tasks={doingTasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default Routine;
