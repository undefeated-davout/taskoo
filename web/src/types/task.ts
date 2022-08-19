import { FieldValue } from 'firebase/firestore';

export type NewTaskType = {
  order_num: number;
  title: string;
  isDone: boolean;
  createdAt: FieldValue | null;
  updatedAt: FieldValue | null;
};

export type TaskType = NewTaskType & {
  id: number;
};
