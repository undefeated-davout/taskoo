import { Timestamp } from 'firebase/firestore';

import { idType, metaType } from './common';

export type addTimerType = {
  timerSeconds: number;
  status: number;
  passedSeconds?: number | null;
  endAt?: Timestamp | null;
};

export type updateTimerType = {
  timerSeconds?: number;
  status?: number;
  passedSeconds?: number | null;
  endAt?: Timestamp | null;
};

export type timerType = addTimerType & idType & metaType;
