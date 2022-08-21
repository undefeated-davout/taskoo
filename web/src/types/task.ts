import { FieldValue } from 'firebase/firestore';

export type addTaskType = {
  order_num: number;
  title: string;
  isDone: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type updateTaskType = {
  order_num?: number;
  title?: string;
  isDone?: boolean;
  updatedAt?: FieldValue;
};

export type taskType = addTaskType & {
  id: string;
};
