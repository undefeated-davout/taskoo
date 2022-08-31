import { idType, metaType } from './common';

export type addTaskType = {
  statusID: string;
  prevStatusID: string;
  title: string;
  isDone: boolean;
};

export type updateTaskType = {
  statusID?: string;
  prevStatusID?: string;
  title?: string;
  isDone?: boolean;
};

export type taskType = addTaskType & idType & metaType;
