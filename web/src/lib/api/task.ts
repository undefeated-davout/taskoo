import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { orderBy, query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { newTaskType, taskType } from 'types/task';

import { getUser } from 'lib/api/user';
import { db } from 'lib/infrastructure/firebase';

// タスク一覧取得
export const getTasks = async (
  setTasks: Dispatch<SetStateAction<taskType[]>>,
) => {
  const user = await getUser();
  const taskColloctionRef = collection(db, 'users', user!.uid, 'tasks');
  const q = query(taskColloctionRef, orderBy('updatedAt', 'desc'));

  const unsubscribe = onSnapshot(q, (docs) => {
    let workTasks: taskType[] = [];
    docs.forEach((doc) => {
      let taskDoc = doc.data() as newTaskType;
      const task: taskType = { id: doc.id, ...taskDoc };
      workTasks.push(task);
    });
    setTasks(workTasks);
  });

  return unsubscribe;
};

// タスク追加
export const addTask = async (newTask: newTaskType) => {
  try {
    const user = await getUser();
    const taskColloctionRef = collection(db, 'users', user!.uid, 'tasks');
    setDoc(doc(taskColloctionRef), newTask);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスク削除
export const deleteTask = async (taskID: string) => {
  try {
    const user = await getUser();
    const userRef = doc(db, 'users', user!.uid);
    const taskRef = doc(userRef, 'tasks', taskID);
    deleteDoc(taskRef);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
