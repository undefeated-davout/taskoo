import {
  QueryConstraint,
  Transaction,
  collection,
  doc,
  orderBy,
  runTransaction,
  updateDoc,
  where,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addTaskType, taskType, updateTaskType } from 'types/task';

import { db } from 'lib/infrastructure/firebase';
import { sortTasks } from 'lib/models/task';

// タスク一覧取得
export const getTasks = (
  userID: string,
  setTasks: Dispatch<SetStateAction<taskType[] | null>>,
  options: { isDone?: boolean; statusID?: string },
) => {
  const taskColloctionRef = collection(db, 'users', userID, 'tasks');

  let constraints: QueryConstraint[] = [];
  // --- WHERE ---
  if (options?.statusID !== undefined)
    constraints.push(where('statusID', '==', options.statusID));
  if (options?.isDone === false)
    constraints.push(where('isDone', '==', options.isDone));
  // --- ORDER BY ---
  constraints.push(orderBy('prevID'));
  constraints.push(orderBy('nextID'));

  let q = query(taskColloctionRef, ...constraints);
  const unsubscribe = onSnapshot(q, (docs) => {
    let workTasks: taskType[] = [];
    docs.forEach((doc) => {
      let taskDoc = doc.data() as addTaskType;
      const task: taskType = { id: doc.id, ...taskDoc };
      workTasks.push(task);
    });
    const sortedTasks = sortTasks(workTasks);
    setTasks(sortedTasks);
  });

  return unsubscribe;
};

// タスク追加
export const addTask = async (
  userID: string,
  lastTaskID: string,
  newTask: addTaskType,
) => {
  try {
    await runTransaction(db, async (tx) => {
      const taskColloctionRef = collection(db, 'users', userID, 'tasks');
      const docRef = doc(taskColloctionRef);
      tx.set(docRef, newTask);
      if (docRef === undefined) throw 'failed to add';
      if (lastTaskID !== '' && docRef !== undefined) {
        updateTaskTx(tx, userID, lastTaskID, { nextID: docRef.id });
      }
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスク更新
const updateTaskCommon = (userID: string, taskID: string) => {
  const userRef = doc(db, 'users', userID);
  return doc(userRef, 'tasks', taskID);
};

export const updateTask = (
  userID: string,
  taskID: string,
  task: updateTaskType,
) => {
  try {
    const taskRef = updateTaskCommon(userID, taskID);
    return updateDoc(taskRef, task);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const updateTaskTx = (
  tx: Transaction,
  userID: string,
  taskID: string,
  task: updateTaskType,
) => {
  try {
    const taskRef = updateTaskCommon(userID, taskID);
    return tx.update(taskRef, task);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// タスク削除
export const deleteTask = async (
  userID: string,
  taskID: string,
  task: taskType,
) => {
  try {
    await runTransaction(db, async (tx) => {
      if (task.prevID !== '')
        updateTaskTx(tx, userID, task.prevID, { nextID: task.nextID });
      if (task.nextID !== '')
        updateTaskTx(tx, userID, task.nextID, { prevID: task.prevID });
      const userRef = doc(db, 'users', userID);
      const taskRef = doc(userRef, 'tasks', taskID);
      tx.delete(taskRef);
    });
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
