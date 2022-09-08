import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'containers/molecules/tasks/Task';

import { taskType } from 'types/task';

type TaskListProps = {
  isMini?: boolean;
  displayToolButton: boolean;
  tasks: taskType[];
};

const TaskList = (props: TaskListProps) => {
  return (
    <List sx={{ width: '100%', p: 0 }}>
      {props.tasks.map((task, _) => (
        <ListItem key={task.id} disablePadding sx={{ display: 'block', height: props.isMini ? 42 : 58 }}>
          <Task isMini={props.isMini} displayToolButton={props.displayToolButton} isDraggable task={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
