import { Timestamp } from 'firebase/firestore';

import { timerStatusConst } from 'lib/constants/timer';

import { modelBaseType } from './common';

export type addTimerType = {
  timerSeconds: number;
  status: timerStatusType;
  passedSeconds?: number | null;
  endAt?: Timestamp | null;
};

export type updateTimerType = Partial<addTimerType>;

export type timerType = addTimerType & modelBaseType;

export type timerStatusType = typeof timerStatusConst[keyof typeof timerStatusConst];
