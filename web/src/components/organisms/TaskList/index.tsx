import { Unsubscribe, collection } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Task from 'components/molecules/Task';

import { newTaskType, taskType } from 'types/task';

import { getUser } from 'lib/api/user';
import { db } from 'lib/infrastructure/firebase';

type TaskListProps = {};

const TaskList = (props: TaskListProps) => {
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    getUser().then((user) => {
      const taskColloctionRef = collection(db, 'users', user!.uid, 'tasks');
      const q = query(taskColloctionRef, orderBy('updatedAt', 'desc'));
      unsubscribe = onSnapshot(q, (docs) => {
        let workTasks: taskType[] = [];
        docs.forEach((doc) => {
          let taskDoc = doc.data() as newTaskType;
          const task: taskType = { id: doc.id, ...taskDoc };
          workTasks.push(task);
        });
        setTasks(workTasks);
      });
    });
    return () => unsubscribe();
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
