import { FieldValue } from 'firebase/firestore';

export type NewTaskType = {
  order_num: number;
  title: string;
  isDone: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type TaskType = NewTaskType & {
  id: number;
};
