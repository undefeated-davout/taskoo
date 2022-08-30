import { idType, metaType } from './common';

export type addTaskOrderType = {
  statusID: string;
  orders: string;
};

export type updateTaskOrderType = {
  statusID: string;
  orders: string;
};

export type taskOrderType = addTaskOrderType & idType & metaType;
