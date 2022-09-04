import { useState } from 'react';

import ConstructionIcon from '@mui/icons-material/Construction';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';

import KanbanPanel from 'components/organisms/tasks/KanbanPanel';

import { kanbanStatusType } from 'types/kanban';

import { useKanbanTask } from 'lib/customHooks/useKanbanTask';

type KanbanProps = {};

const kanbanStatuses: kanbanStatusType[] = [
  { id: '1', orderNum: 1, name: 'DOING' },
  { id: '2', orderNum: 2, name: 'TODO' },
  { id: '3', orderNum: 3, name: 'IDEA' },
  { id: '4', orderNum: 4, name: 'CONDITIONAL' },
  { id: '80', orderNum: 5, name: 'DONE' },
];

const Kanban = (props: KanbanProps) => {
  const [displayToolButton, setDisplayToolButton] = useState(false);

  const kanbanTask = useKanbanTask();
  if (kanbanTask === null) return <></>;

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <Switch
                name="displayToolButton"
                color="success"
                checked={displayToolButton}
                onChange={(event) => setDisplayToolButton(event.target.checked)}
              />
            }
            label={<ConstructionIcon sx={{ mt: 0.6 }} />}
          />
        </Box>

        <Grid container spacing={2}>
          {kanbanStatuses.map((kanbanStatus, _) => (
            <Grid key={kanbanStatus.id}>
              <KanbanPanel
                kanbanStatus={kanbanStatus}
                tasks={kanbanTask.statusIDTasks[kanbanStatus.id] ?? []}
                displayToolButton={displayToolButton}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Kanban;
