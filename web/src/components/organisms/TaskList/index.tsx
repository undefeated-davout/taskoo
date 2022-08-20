import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'components/molecules/Task';

import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';

type TaskListProps = {};

const TaskList = (props: TaskListProps) => {
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    (async () => {
      unsubscribe = await getTasks(setTasks);
    })();
    return () => unsubscribe && unsubscribe();
  }, []);

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
