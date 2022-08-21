import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { orderBy, query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { newTaskType, taskType } from 'types/task';

import { db } from 'lib/infrastructure/firebase';

// タスク一覧取得
export const getTasks = (
  userID: string,
  setTasks: Dispatch<SetStateAction<taskType[]>>,
) => {
  const taskColloctionRef = collection(db, 'users', userID, 'tasks');
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
export const addTask = (userID: string, newTask: newTaskType) => {
  try {
    const taskColloctionRef = collection(db, 'users', userID, 'tasks');
    setDoc(doc(taskColloctionRef), newTask);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスク削除
export const deleteTask = (userID: string, taskID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskRef = doc(userRef, 'tasks', taskID);
    deleteDoc(taskRef);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
