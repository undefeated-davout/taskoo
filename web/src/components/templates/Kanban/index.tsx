import { useState } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';

import KanbanPanel from 'components/organisms/tasks/KanbanPanel';

import { kanbanStatusType } from 'types/kanban';

type KanbanProps = {};

const kanbanStatuses: kanbanStatusType[] = [
  { id: '1', orderNum: 1, name: 'DOING' },
  { id: '2', orderNum: 2, name: 'TODO' },
  { id: '3', orderNum: 3, name: 'IDEA' },
  { id: '4', orderNum: 4, name: 'CONDITIONAL' },
  { id: '80', orderNum: 5, name: 'DONE' },
];

const Kanban = (props: KanbanProps) => {
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <Switch
                name="displayDeleteButton"
                color="success"
                checked={displayDeleteButton}
                onChange={(event) =>
                  setDisplayDeleteButton(event.target.checked)
                }
              />
            }
            label={<DeleteOutlineOutlinedIcon sx={{ mt: 0.6 }} />}
          />
        </Box>

        <Grid container spacing={2}>
          {kanbanStatuses.map((kanbanStatus, _) => (
            <Grid key={kanbanStatus.id}>
              <KanbanPanel
                kanbanStatus={kanbanStatus}
                displayDeleteButton={displayDeleteButton}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Kanban;
