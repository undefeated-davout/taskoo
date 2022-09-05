import {
  QueryConstraint,
  Transaction,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import {
  addTaskType,
  statusIDTasksType,
  taskType,
  updateTaskType,
} from 'types/task';
import { updateTaskOrderType } from 'types/task_order';

import { db } from 'lib/infrastructure/firebase';

import { createStruct, updateStruct } from './common';
import { addTaskOrderTx, updateTaskOrderTx } from './task_order';

// タスク一覧取得
export const getTasks = (
  userID: string,
  setTasks: Dispatch<SetStateAction<taskType[] | undefined>>,
) => {
  const taskColloctionRef = collection(db, 'users', userID, 'tasks');
  let constraints: QueryConstraint[] = [];
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
const addTaskTx = (tx: Transaction, userID: string, task: addTaskType) => {
  try {
    const taskColloctionRef = collection(db, 'users', userID, 'tasks');
    const taskRef = doc(taskColloctionRef);
    tx.set(taskRef, createStruct(task));
    return taskRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addTaskWithOrder = async (
  userID: string,
  newTask: addTaskType,
  taskOrderID: string,
  statusIDTasks: statusIDTasksType,
) => {
  try {
    await runTransaction(db, async (tx) => {
      const taskRef = addTaskTx(tx, userID, newTask);
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
        taskOrder['orderDict'][statusID] =
          newStatusIDTaskIDs[statusID].join(',');
      }
      if (taskOrderID === '') {
        addTaskOrderTx(tx, userID, taskOrder);
      } else {
        updateTaskOrderTx(tx, userID, taskOrderID, taskOrder);
      }
    });
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

export const updateTaskTx = (
  tx: Transaction,
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

export const updateTaskWithOrder = async (
  userID: string,
  taskID: string,
  task: updateTaskType,
  taskOrderID: string,
  newStatusIDTasks: statusIDTasksType,
) => {
  try {
    await runTransaction(db, async (tx) => {
      updateTaskTx(tx, userID, taskID, task);
      // --- taskOrder ---
      let taskOrder: updateTaskOrderType = { orderDict: {} };
      // 書き込み用のorderDictを作成
      for (const statusID in newStatusIDTasks) {
        taskOrder['orderDict'][statusID] = newStatusIDTasks[statusID]
          .map((t) => t.id)
          .join(',');
      }
      if (taskOrderID === '') {
        addTaskOrderTx(tx, userID, taskOrder);
      } else {
        updateTaskOrderTx(tx, userID, taskOrderID, taskOrder);
      }
    });
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// タスク削除
const deleteTaskTx = (tx: Transaction, userID: string, taskID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskRef = doc(userRef, 'tasks', taskID);
    tx.delete(taskRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const deleteTaskWithOrder = async (
  userID: string,
  task: taskType,
  taskOrderID: string,
  statusIDTasks: statusIDTasksType,
) => {
  try {
    await runTransaction(db, async (tx) => {
      deleteTaskTx(tx, userID, task.id);

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
        ].filter((id) => task.id !== id);
      }

      let taskOrder: updateTaskOrderType = { orderDict: {} };
      // 書き込み用のorderDictを作成
      for (const statusID in newStatusIDTaskIDs) {
        taskOrder['orderDict'][statusID] =
          newStatusIDTaskIDs[statusID].join(',');
      }
      updateTaskOrderTx(tx, userID, taskOrderID, taskOrder);
    });
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
