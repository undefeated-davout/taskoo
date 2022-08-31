import {
  QueryConstraint,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addTaskType, taskType, updateTaskType } from 'types/task';
import { updateTaskOrderType } from 'types/task_order';

import { db } from 'lib/infrastructure/firebase';
import { statusIDTasksType } from 'lib/recoil/kanbanTask';

import { createStruct, updateStruct } from './common';
import { addTaskOrder, updateTaskOrder } from './task_order';

// タスク一覧取得
export const getTasks = (
  userID: string,
  setTasks: Dispatch<SetStateAction<taskType[] | null>>,
  options: { isDone?: boolean; statusID?: string },
) => {
  const taskColloctionRef = collection(db, 'users', userID, 'tasks');

  let constraints: QueryConstraint[] = [];
  // --- WHERE ---
  if (options.statusID !== undefined)
    constraints.push(where('statusID', '==', options.statusID));
  if (options.isDone === false)
    constraints.push(where('isDone', '==', options.isDone));

  let q = query(taskColloctionRef, ...constraints);
  const unsubscribe = onSnapshot(q, (docs) => {
    let workTasks: taskType[] = [];
    docs.forEach((doc) => {
      let taskDoc = doc.data() as Omit<taskType, 'id'>;
      const task: taskType = { id: doc.id, ...taskDoc };
      workTasks.push(task);
    });
    setTasks(workTasks);
  });

  return unsubscribe;
};

// タスクソート順追加
const addTask = (userID: string, task: addTaskType) => {
  try {
    const taskColloctionRef = collection(db, 'users', userID, 'tasks');
    const taskRef = doc(taskColloctionRef);
    setDoc(taskRef, createStruct(task));
    return taskRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addTaskWithOrder = (
  userID: string,
  newTask: addTaskType,
  taskOrderID: string,
  statusIDTasks: statusIDTasksType,
) => {
  try {
    const taskRef = addTask(userID, newTask);
    if (taskRef === undefined) return;

    // statusIDごとのtaskIDリスト作成
    let newStatusIDTaskIDs: { [statusID: string]: string[] } = {};
    for (const statusID in statusIDTasks) {
      let taskIDs = statusIDTasks[statusID].map((task) => task.id);
      newStatusIDTaskIDs[statusID] = taskIDs;
    }

    // INSERTしたtaskIDを追加上記リストに追加
    newStatusIDTaskIDs[newTask.statusID]
      ? newStatusIDTaskIDs[newTask.statusID].push(taskRef.id)
      : (newStatusIDTaskIDs[newTask.statusID] = [taskRef.id]);

    let taskOrder: updateTaskOrderType = { orderDict: {} };
    // 書き込み用のorderDictを作成
    for (const statusID in newStatusIDTaskIDs) {
      taskOrder['orderDict'][statusID] = newStatusIDTaskIDs[statusID].join(',');
    }
    if (taskOrderID === '') {
      addTaskOrder(userID, taskOrder);
    } else {
      updateTaskOrder(userID, taskOrderID, taskOrder);
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスクソート順更新
export const updateTask = (
  userID: string,
  taskID: string,
  task: updateTaskType,
) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskRef = doc(userRef, 'tasks', taskID);
    updateDoc(taskRef, updateStruct(task));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// タスク削除
const deleteTask = (userID: string, taskID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskRef = doc(userRef, 'tasks', taskID);
    deleteDoc(taskRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const deleteTaskWithOrder = (
  userID: string,
  task: taskType,
  taskOrderID: string,
  statusIDTasks: statusIDTasksType,
) => {
  try {
    deleteTask(userID, task.id);

    // statusIDごとのtaskIDリスト作成
    let newStatusIDTaskIDs: { [statusID: string]: string[] } = {};
    for (const statusID in statusIDTasks) {
      let taskIDs = statusIDTasks[statusID].map((task) => task.id);
      newStatusIDTaskIDs[statusID] = taskIDs;
    }

    // DELETEしたtaskIDを追加上記リストから除去
    if (newStatusIDTaskIDs[task.statusID]) {
      newStatusIDTaskIDs[task.statusID] = newStatusIDTaskIDs[
        task.statusID
      ].filter((taskID) => task.id !== taskID);
    }

    let taskOrder: updateTaskOrderType = { orderDict: {} };
    // 書き込み用のorderDictを作成
    for (const statusID in newStatusIDTaskIDs) {
      taskOrder['orderDict'][statusID] = newStatusIDTaskIDs[statusID].join(',');
    }
    updateTaskOrder(userID, taskOrderID, taskOrder);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
