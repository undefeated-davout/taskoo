import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'components/molecules/Task';

import { taskType } from 'types/task';

type TaskListProps = {
  tasks: taskType[];
};

const TaskList = (props: TaskListProps) => {
  return (
    <List sx={{ width: '100%', p: 0 }}>
      {props.tasks.map((task, _) => (
        <ListItem
          key={task.id}
          disablePadding
          sx={{ display: 'block', mt: 1, height: 50 }}
        >
          <Task task={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
