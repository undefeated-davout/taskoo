import { collection, doc, setDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

import { newTaskType } from 'types/task';

import { getUser } from 'lib/api/user';
import { db } from 'lib/infrastructure/firebase';

export const getTasks = async () => {
  const user = await getUser();

  const taskColloctionRef = collection(db, 'users', user!.uid, 'tasks');

  const unsubscribe = onSnapshot(taskColloctionRef, (docs) => {
    console.log('🚀 ~ file: task.ts ~ line 16 ~ tasks ~ docs', docs);
  });
  return unsubscribe;
};

export const addTask = async (newTask: newTaskType) => {
  try {
    const user = await getUser();
    const taskColloctionRef = collection(db, 'users', user!.uid, 'tasks');
    setDoc(doc(taskColloctionRef), newTask);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteTask = (taskID: string) => console.log('delete', taskID);
