import { QueryConstraint, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addRoutineType, routineType, updateRoutineType } from 'types/routine';

import { db } from 'lib/infrastructure/firebase';

import { createStruct, updateStruct } from './common';

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

// ルーティン追加
export const addRoutine = (userID: string, routine: addRoutineType) => {
  try {
    const routineColloctionRef = collection(db, 'users', userID, 'routines');
    setDoc(doc(routineColloctionRef), createStruct(routine));
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// ルーティン更新
export const updateRoutine = (userID: string, routineID: string, routine: updateRoutineType) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineRef = doc(userRef, 'routines', routineID);
    updateDoc(routineRef, updateStruct(routine));
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// ルーティン削除
export const deleteRoutine = (userID: string, routineID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const routineRef = doc(userRef, 'routines', routineID);
    deleteDoc(routineRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
