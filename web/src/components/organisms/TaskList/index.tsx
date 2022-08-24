import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'components/molecules/Task';

import { taskType } from 'types/task';

type TaskListProps = {
  isMini: boolean;
  tasks: taskType[];
};

const TaskList = (props: TaskListProps) => {
  return (
    <List sx={{ width: '100%', p: 0 }}>
      {props.tasks.map((task, _) => (
        <ListItem
          key={task.id}
          disablePadding
          sx={{ display: 'block', mt: 1, height: props.isMini ? 34 : 50 }}
        >
          <Task isMini={props.isMini} task={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
