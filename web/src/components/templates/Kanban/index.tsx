import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';

import KanbanList from 'components/organisms/KanbanList';

type KanbanProps = {};

const kanbans = ['DOING', 'TODO', 'IDEA', 'CONDITION', 'DONE'];

const Kanban = (props: KanbanProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        {kanbans.map((key, _) => (
          <Grid key={key}>
            <KanbanList title={key} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Kanban;
