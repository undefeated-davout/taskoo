import { FieldValue } from 'firebase/firestore';

export type addTimerType = {
  timerSeconds: number;
  status: number;
  passedSeconds?: number | null;
  endAt?: FieldValue | null;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type updateTimerType = {
  timerSeconds?: number;
  status?: number;
  passedSeconds?: number | null;
  endAt?: FieldValue | null;
  updatedAt: FieldValue;
};

export type timerType = addTimerType & {
  id: string;
};
