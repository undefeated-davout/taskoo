import { FieldValue } from 'firebase/firestore';

export type newTaskType = {
  order_num: number;
  title: string;
  isDone: boolean;
  createdAt: FieldValue | null;
  updatedAt: FieldValue | null;
};

export type taskType = newTaskType & {
  id: number;
};
