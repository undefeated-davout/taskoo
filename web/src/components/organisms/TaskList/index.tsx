import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'components/molecules/Task';

import { taskType } from 'types/task';

type TaskListProps = {};

const TaskList = (props: TaskListProps) => {
  const tasks: taskType[] = Array.from(Array(15).keys()).map((key, _) => {
    const id = key + 1;
    return {
      id: id,
      order_num: id,
      title: `テストタスク 入力中${id}`,
      isDone: false,
      createdAt: null,
      updatedAt: null,
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
          <Task task={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
