import { FieldValue } from 'firebase/firestore';

export type addTaskType = {
  nextID: string;
  statusID: string;
  title: string;
  isDone: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type updateTaskType = {
  nextID?: string;
  statusID?: string;
  title?: string;
  isDone?: boolean;
  updatedAt?: FieldValue;
};

export type taskType = addTaskType & {
  id: string;
};
