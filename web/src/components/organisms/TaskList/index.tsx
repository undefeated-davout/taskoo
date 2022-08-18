import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'components/molecules/Task';

import { TaskType } from 'types/task';

type TaskListProps = {};

const TaskList = (props: TaskListProps) => {
  const tasks: TaskType[] = Array.from(Array(10).keys()).map((key, _) => {
    const id = key + 1;
    return {
      id: id,
      order_num: id,
      title: `テストタスク 入力中${id}`,
    };
  });

  return (
    <List sx={{ width: '100%' }}>
      {tasks.map((task, _) => (
        <ListItem
          key={task.id}
          disablePadding
          sx={{ display: 'block', mt: 1, height: 50 }}
        >
          <Task task={task}></Task>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
