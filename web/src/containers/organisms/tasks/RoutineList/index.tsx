import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Routine from 'containers/molecules/tasks/Routine';

import { routineType } from 'types/routine';

type RoutineListProps = {
  routines: routineType[];
};

const RoutineList = (props: RoutineListProps) => {
  return (
    <List sx={{ width: '100%', p: 0 }}>
      {props.routines.map((routine, _) => (
        <ListItem key={routine.id} disablePadding sx={{ display: 'block', heigh: 58 }}>
          <Routine routine={routine} />
        </ListItem>
      ))}
    </List>
  );
};

export default RoutineList;
