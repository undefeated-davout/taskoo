import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import {
  addTaskOrderType,
  taskOrderType,
  updateTaskOrderType,
} from 'types/task_order';

import { db } from 'lib/infrastructure/firebase';

import { createStruct, updateStruct } from './common';

// タスクソート順情報1件取得
export const getTaskOrder = (
  userID: string,
  setTaskOrder: Dispatch<SetStateAction<taskOrderType | null>>,
) => {
  const taskOrderColloctionRef = collection(db, 'users', userID, 'task_orders');

  const unsubscribe = onSnapshot(taskOrderColloctionRef, (docs) => {
    setTaskOrder(null);
    docs.forEach((doc) => {
      let taskOrderDoc = doc.data() as Omit<taskOrderType, 'id'>;
      const taskOrder: taskOrderType = { id: doc.id, ...taskOrderDoc };
      setTaskOrder(taskOrder);
      return;
    });
  });

  return unsubscribe;
};

// タスクソート順追加
export const addTaskOrder = (userID: string, taskOrder: addTaskOrderType) => {
  try {
    const taskOrderColloctionRef = collection(
      db,
      'users',
      userID,
      'task_orders',
    );
    setDoc(doc(taskOrderColloctionRef), createStruct(taskOrder));
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスクソート順更新
export const updateTaskOrder = (
  userID: string,
  taskOrderID: string,
  taskOrder: updateTaskOrderType,
) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskOrderRef = doc(userRef, 'task_orders', taskOrderID);
    updateDoc(taskOrderRef, updateStruct(taskOrder));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// タスク削除
export const deleteTaskOrder = (userID: string, taskOrderID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const taskOrderRef = doc(userRef, 'task_orders', taskOrderID);
    deleteDoc(taskOrderRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
