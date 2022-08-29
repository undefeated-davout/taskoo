import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

import { addTimerType, timerType, updateTimerType } from 'types/timer';

import { db } from 'lib/infrastructure/firebase';

// タイマー情報1件取得
export const getTimer = (
  userID: string,
  setTimer: Dispatch<SetStateAction<timerType | null | undefined>>,
) => {
  const timerColloctionRef = collection(db, 'users', userID, 'timers');

  const unsubscribe = onSnapshot(timerColloctionRef, (docs) => {
    setTimer(null);
    docs.forEach((doc) => {
      let timerDoc = doc.data() as addTimerType;
      const timer: timerType = { id: doc.id, ...timerDoc };
      setTimer(timer);
      return;
    });
  });

  return unsubscribe;
};

// タイマー追加
export const addTimer = (userID: string, newTimer: addTimerType) => {
  try {
    const timerColloctionRef = collection(db, 'users', userID, 'timers');
    setDoc(doc(timerColloctionRef), newTimer);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// タイマー更新
export const updateTimer = (
  userID: string,
  timerID: string,
  timer: updateTimerType,
) => {
  try {
    const userRef = doc(db, 'users', userID);
    const timerRef = doc(userRef, 'timers', timerID);
    updateDoc(timerRef, timer);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// タイマー削除
export const deleteTimer = (userID: string, timerID: string) => {
  try {
    const userRef = doc(db, 'users', userID);
    const timerRef = doc(userRef, 'timers', timerID);
    deleteDoc(timerRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
