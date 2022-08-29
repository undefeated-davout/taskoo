import { serverTimestamp } from 'firebase/firestore';

export const createStruct = (target: object) => {
  return {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...target,
  };
};

export const updateStruct = (target: object) => {
  return {
    updatedAt: serverTimestamp(),
    ...target,
  };
};
