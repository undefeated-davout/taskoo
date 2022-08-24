import { FieldValue } from 'firebase/firestore';

export type addTaskType = {
  orderNum: number;
  statusID: number;
  title: string;
  isDone: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type updateTaskType = {
  orderNum?: number;
  statusID?: number;
  title?: string;
  isDone?: boolean;
  updatedAt?: FieldValue;
};

export type taskType = addTaskType & {
  id: string;
};
