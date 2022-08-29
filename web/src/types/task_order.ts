import { idType, metaType } from './common';

export type addTaskOrderType = {
  order: string;
};

export type updateTaskOrderType = {
  order: string;
};

export type taskOrderType = addTaskOrderType & idType & metaType;
