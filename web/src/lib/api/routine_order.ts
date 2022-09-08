import { Transaction, collection, doc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addRoutineOrderType, routineOrderType, updateRoutineOrderType } from 'types/routine_order';

import { db } from 'lib/infrastructure/firebase';

import { createStruct, updateStruct } from './common';

// ルーティンソート順情報1件取得
export const getRoutineOrder = (
  userID: string,
  setRoutineOrder: Dispatch<SetStateAction<routineOrderType | null | undefined>>,
) => {
  const routineOrderColloctionRef = collection(db, 'users', userID, 'routine_orders');

  const unsubscribe = onSnapshot(routineOrderColloctionRef, (docs) => {
    setRoutineOrder(null);
    docs.forEach((doc) => {
      let routineOrderDoc = doc.data() as Omit<routineOrderType, 'id'>;
      const routineOrder: routineOrderType = { id: doc.id, ...routineOrderDoc };
      setRoutineOrder(routineOrder);
      return;
    });
  });

  return unsubscribe;
};

// ルーティンソート順追加
export const addRoutineOrderTx = (tx: Transaction, userID: string, routineOrder: addRoutineOrderType) => {
  try {
    const routineOrderColloctionRef = collection(db, 'users', userID, 'routine_orders');
    const routineOrderRef = doc(routineOrderColloctionRef);
    tx.set(routineOrderRef, createStruct(routineOrder));
    return routineOrderRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// ルーティンソート順更新
export const updateRoutineOrderTx = (
  tx: Transaction,
  userID: string,
  routineOrderID: string,
  routineOrder: updateRoutineOrderType,
) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineOrderRef = doc(userRef, 'routine_orders', routineOrderID);
    tx.update(routineOrderRef, updateStruct(routineOrder));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// ルーティン削除
export const deleteRoutineOrderTx = (tx: Transaction, userID: string, routineOrderID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineOrderRef = doc(userRef, 'routine_orders', routineOrderID);
    tx.delete(routineOrderRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
