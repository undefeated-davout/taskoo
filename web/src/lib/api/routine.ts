import { QueryConstraint, Transaction, collection, doc, runTransaction, updateDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addRoutineType, routineType, updateRoutineType } from 'types/routine';
import { addRoutineOrderType, updateRoutineOrderType } from 'types/routine_order';

import { db } from 'lib/infrastructure/firebase';

import { createStruct, updateStruct } from './common';
import { addRoutineOrderTx, updateRoutineOrderTx } from './routine_order';

// タスク一覧取得
export const getRoutines = (userID: string, setRoutines: Dispatch<SetStateAction<routineType[] | undefined>>) => {
  const routineColloctionRef = collection(db, 'users', userID, 'routines');
  let constraints: QueryConstraint[] = [];
  let q = query(routineColloctionRef, ...constraints);
  const unsubscribe = onSnapshot(q, (docs) => {
    let workRoutines: routineType[] = [];
    docs.forEach((doc) => {
      let routineDoc = doc.data() as Omit<routineType, 'id'>;
      const routine: routineType = { id: doc.id, ...routineDoc };
      workRoutines.push(routine);
    });
    setRoutines(workRoutines);
  });

  return unsubscribe;
};

// タスクソート順追加
const addRoutineTx = (tx: Transaction, userID: string, routine: addRoutineType) => {
  try {
    const routineColloctionRef = collection(db, 'users', userID, 'routines');
    const routineRef = doc(routineColloctionRef);
    tx.set(routineRef, createStruct(routine));
    return routineRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addRoutineWithOrder = async (
  userID: string,
  newRoutine: addRoutineType,
  routineOrderID: string,
  routines: routineType[],
) => {
  try {
    await runTransaction(db, async (tx) => {
      const routineRef = addRoutineTx(tx, userID, newRoutine);
      if (routineRef === undefined) return;

      const newRoutineIDs = [...routines.map((routine) => routine.id), routineRef.id];

      // 書き込み用のorderDictを作成
      const routineOrder: addRoutineOrderType = { order: newRoutineIDs.join(',') };
      if (routineOrderID === '') {
        addRoutineOrderTx(tx, userID, routineOrder);
      } else {
        updateRoutineOrderTx(tx, userID, routineOrderID, routineOrder);
      }
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タスクソート順更新
export const updateRoutine = (userID: string, routineID: string, routine: updateRoutineType) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineRef = doc(userRef, 'routines', routineID);
    updateDoc(routineRef, updateStruct(routine));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const updateRoutineTx = (tx: Transaction, userID: string, routineID: string, routine: updateRoutineType) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineRef = doc(userRef, 'routines', routineID);
    updateDoc(routineRef, updateStruct(routine));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const updateRoutineWithOrder = async (
  userID: string,
  routineID: string,
  routine: updateRoutineType,
  routineOrderID: string,
  newRoutines: routineType[],
) => {
  try {
    await runTransaction(db, async (tx) => {
      updateRoutineTx(tx, userID, routineID, routine);

      // --- routineOrder ---
      const routineOrder: updateRoutineOrderType = { order: newRoutines.join(',') };
      if (routineOrderID === '') {
        addRoutineOrderTx(tx, userID, routineOrder);
      } else {
        updateRoutineOrderTx(tx, userID, routineOrderID, routineOrder);
      }
    });
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// タスク削除
const deleteRoutineTx = (tx: Transaction, userID: string, routineID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineRef = doc(userRef, 'routines', routineID);
    tx.delete(routineRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const deleteRoutineWithOrder = async (
  userID: string,
  routine: routineType,
  routineOrderID: string,
  newRoutines: routineType[],
) => {
  try {
    await runTransaction(db, async (tx) => {
      deleteRoutineTx(tx, userID, routine.id);

      const routineOrder: updateRoutineOrderType = { order: newRoutines.join(',') };
      updateRoutineOrderTx(tx, userID, routineOrderID, routineOrder);
    });
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
