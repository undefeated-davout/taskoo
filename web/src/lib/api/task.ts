import {
  DocumentData,
  Query,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { orderBy, query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addTaskType, taskType, updateTaskType } from 'types/task';

import { db } from 'lib/infrastructure/firebase';

// タスク一覧取得
export const getTasks = (
  userID: string,
  setTasks: Dispatch<SetStateAction<taskType[]>>,
  isDone?: boolean,
) => {
  const taskColloctionRef = collection(db, 'users', userID, 'tasks');

  let q: Query<DocumentData>;
  if (isDone === false) {
    q = query(
      taskColloctionRef,
      where('isDone', '==', isDone),
      orderBy('updatedAt', 'desc'),
    );
  } else {
    q = query(taskColloctionRef, orderBy('updatedAt', 'desc'));
  }

  const unsubscribe = onSnapshot(q, (docs) => {
    let workTasks: taskType[] = [];
    docs.forEach((doc) => {
      let taskDoc = doc.data() as addTaskType;
      const task: taskType = { id: doc.id, ...taskDoc };
      workTasks.push(task);
    });
    setTasks(workTasks);
  });

  return unsubscribe;
};

// タスク追加
export const addTask = (userID: string, newTask: addTaskType) => {
  try {
    const taskColloctionRef = collection(db, 'users', userID, 'tasks');
    setDoc(doc(taskColloctionRef), newTask);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスク更新
export const updateTask = (
  userID: string,
  taskID: string,
  task: updateTaskType,
) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskRef = doc(userRef, 'tasks', taskID);
    updateDoc(taskRef, task);
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
    console.error('Error deleting document: ', e);
  }
};
