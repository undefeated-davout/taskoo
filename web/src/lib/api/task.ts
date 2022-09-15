import {
  DocumentData,
  DocumentReference,
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

import { addTaskType, statusIDTasksType, taskType, updateTaskType } from 'types/task';
import { updateTaskOrderType } from 'types/task_order';

import { db } from 'lib/infrastructure/firebase';

import { createStruct, updateStruct } from './common';
import { addTaskOrderTx, updateTaskOrderTx } from './task_order';

// タスク一覧取得
export const getTasks = (userID: string, setTasks: Dispatch<SetStateAction<taskType[] | undefined>>) => {
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
  statusID: string,
  newTasks: addTaskType[],
  taskOrderID: string,
  statusIDTasks: statusIDTasksType,
  pushTop: boolean,
) => {
  try {
    await runTransaction(db, async (tx) => {
      const newTaskRefsRaw = newTasks.map((newTask) => addTaskTx(tx, userID, newTask));
      if (newTaskRefsRaw.includes(undefined)) return;
      const newTaskRefs = newTaskRefsRaw as DocumentReference<DocumentData>[];
      const newTaskIDs = newTaskRefs.map((ref) => ref.id);

      // statusIDごとのtaskIDリスト作成
      const newStatusIDTaskIDs = Object.keys(statusIDTasks).reduce(
        (dict: { [statusID: string]: string[] }, statusID) => {
          let taskIDs = statusIDTasks[statusID].map((task) => task.id);
          dict[statusID] = taskIDs;
          return dict;
        },
        {},
      );

      // INSERTしたtaskIDを追加上記リストの先頭に追加
      newStatusIDTaskIDs[statusID] = pushTop
        ? newTaskIDs.concat(newStatusIDTaskIDs[statusID]) || newTaskIDs
        : newStatusIDTaskIDs[statusID]?.concat(newTaskIDs) || newTaskIDs;

      const taskOrder: updateTaskOrderType = {
        orderDict: Object.keys(newStatusIDTaskIDs).reduce((dict: { [statusID: string]: string }, statusID) => {
          dict[statusID] = newStatusIDTaskIDs[statusID].join(',');
          return dict;
        }, {}),
      };
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
export const updateTask = (userID: string, taskID: string, task: updateTaskType) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskRef = doc(userRef, 'tasks', taskID);
    updateDoc(taskRef, updateStruct(task));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const updateTaskTx = (tx: Transaction, userID: string, taskID: string, task: updateTaskType) => {
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
      const taskOrder: updateTaskOrderType = {
        orderDict: Object.keys(newStatusIDTasks).reduce((dict: { [statusID: string]: string }, statusID) => {
          dict[statusID] = newStatusIDTasks[statusID].map((t) => t.id).join(',');
          return dict;
        }, {}),
      };
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
      const newStatusIDTaskIDs = Object.keys(statusIDTasks).reduce(
        (dict: { [statusID: string]: string[] }, statusID) => {
          let taskIDs = statusIDTasks[statusID].map((task) => task.id);
          dict[statusID] = taskIDs;
          return dict;
        },
        {},
      );

      // DELETEしたtaskIDを追加上記リストから除去
      if (newStatusIDTaskIDs[task.statusID]) {
        newStatusIDTaskIDs[task.statusID] = newStatusIDTaskIDs[task.statusID].filter((id) => task.id !== id);
      }

      const taskOrder: updateTaskOrderType = {
        orderDict: Object.keys(newStatusIDTaskIDs).reduce((dict: { [statusID: string]: string }, statusID) => {
          dict[statusID] = newStatusIDTaskIDs[statusID].join(',');
          return dict;
        }, {}),
      };

      updateTaskOrderTx(tx, userID, taskOrderID, taskOrder);
    });
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
