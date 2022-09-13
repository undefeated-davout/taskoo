import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useKanbanTask } from 'hooks/useKanbanTask';

import CenterContainerBox from 'components/atoms/CenterContainerBox';

import Task from 'containers/molecules/tasks/Task';
import TaskFilterRadioButton from 'containers/molecules/tasks/TaskFilterRadioButton';

import { kanbanStatusConst } from 'lib/constants/task';

type FocusProps = {};

const Focus = (props: FocusProps) => {
  const theme = useTheme();
  const kanbanTask = useKanbanTask();
  const [taskCondition, setTaskCondition] = useState('all');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaskCondition((event.target as HTMLInputElement).value);

  if (kanbanTask === null) return <></>;
  const doingActiveTasks =
    kanbanTask.statusIDTasks[kanbanStatusConst.doing]?.filter((task) => {
      if (task.isChecked) return false;
      if (
        taskCondition === 'all' ||
        (taskCondition === 'tasks' && task.routineID === undefined) ||
        (taskCondition === 'routines' && task.routineID !== undefined)
      ) {
        return true;
      }
      return false;
    }) ?? [];

  return (
    <CenterContainerBox>
      <Box sx={{ width: '100%', maxWidth: 359 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TaskFilterRadioButton taskCondition={taskCondition} onChange={handleChange} />
        </Box>

        <Card
          sx={{
            p: 2,
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
              <Task isMini={false} displayToolButton={true} task={doingActiveTasks[0]} />
            </>
          )}
        </Card>
      </Box>
    </CenterContainerBox>
  );
};

export default Focus;
