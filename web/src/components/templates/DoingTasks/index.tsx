import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import HorizontalCenterContainerBox from 'components/atoms/HorizontalCenterContainerBox';
import AddTaskForm from 'components/molecules/tasks/AddTaskForm';
import TaskList from 'components/organisms/tasks/TaskList';

import { kanbanStatusConst } from 'lib/constants/kanban';
import { useKanbanTask } from 'lib/customHooks/useKanbanTask';

type DoingTasksProps = {};

const DoingTasks = (props: DoingTasksProps) => {
  const theme = useTheme();

  const kanbanTask = useKanbanTask();
  if (kanbanTask === null) return <></>;

  const doingTasks =
    kanbanTask.statusIDTasks[kanbanStatusConst.doing]?.filter(
      (task) => !task.isChecked,
    ) ?? [];
  const checkedTasks =
    kanbanTask.statusIDTasks[kanbanStatusConst.doing]?.filter(
      (task) => task.isChecked,
    ) ?? [];

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
        <Box sx={{ mt: 1 }} />

        <Box sx={{ mt: doingTasks.length === 0 ? 0 : 3 }} />
        <TaskList tasks={doingTasks} />

        <Box sx={{ mt: checkedTasks.length === 0 ? 0 : 3 }} />
        <TaskList tasks={checkedTasks} />
      </Card>
    </HorizontalCenterContainerBox>
  );
};

export default DoingTasks;
