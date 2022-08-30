import { idType, metaType } from './common';

export type addTaskOrderType = {
  statusID: string;
  order: string;
};

export type updateTaskOrderType = {
  statusID: string;
  order: string;
};

export type taskOrderType = addTaskOrderType & idType & metaType;
