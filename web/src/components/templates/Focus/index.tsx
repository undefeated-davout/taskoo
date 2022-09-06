import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import CenterContainerBox from 'components/atoms/CenterContainerBox';
import Task from 'components/molecules/tasks/Task';

import { kanbanStatusConst } from 'lib/constants/kanban';
import { useKanbanTask } from 'lib/customHooks/useKanbanTask';

type FocusProps = {};

const Focus = (props: FocusProps) => {
  const theme = useTheme();

  const kanbanTask = useKanbanTask();
  if (kanbanTask === null) return <></>;

  const doingActiveTasks =
    kanbanTask.statusIDTasks[kanbanStatusConst.doing]?.filter(
      (task) => !task.isChecked,
    ) ?? [];

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
        {doingActiveTasks.length === 0 ? (
          <Typography variant="h6" sx={{ fontWeight: 100 }}>
            {'NO TASKS IN "DOING".'}
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 100 }}>
            FOCUS ON THE TASK.
            <br />
            REMAINING: {doingActiveTasks.length}
          </Typography>
        )}

        {doingActiveTasks.length > 0 && (
          <>
            <Box sx={{ mt: 2 }}></Box>
            <Task
              isMini={false}
              displayToolButton={true}
              task={doingActiveTasks[0]}
            />
          </>
        )}
      </Card>
    </CenterContainerBox>
  );
};

export default Focus;
