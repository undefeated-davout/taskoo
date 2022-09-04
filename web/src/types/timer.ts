import { Timestamp } from 'firebase/firestore';

import { modelBaseType } from './common';

export type addTimerType = {
  timerSeconds: number;
  status: number;
  passedSeconds?: number | null;
  endAt?: Timestamp | null;
};

export type updateTimerType = Partial<addTimerType>;

export type timerType = addTimerType & modelBaseType;
