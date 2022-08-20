import { collection, doc, setDoc } from 'firebase/firestore';

import { newTaskType } from 'types/task';

import { getUser } from 'lib/api/user';
import { db } from 'lib/infrastructure/firebase';

export const addTask = async (newTask: newTaskType) => {
  try {
    const user = await getUser();
    const taskColloctionRef = collection(db, 'users', user!.uid, 'tasks');
    setDoc(doc(taskColloctionRef), newTask);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteTask = (taskID: number) => console.log('delete', taskID);
