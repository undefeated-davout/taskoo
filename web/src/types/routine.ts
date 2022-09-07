import { modelBaseType } from './common';

export type addRoutineType = {
  title: string;
};

export type updateRoutineType = Partial<addRoutineType>;

export type routineType = addRoutineType & modelBaseType;
