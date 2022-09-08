import { modelBaseType } from './common';

export type addRoutineOrderType = {
  order: string;
};

export type updateRoutineOrderType = addRoutineOrderType;

export type routineOrderType = addRoutineOrderType & modelBaseType;
