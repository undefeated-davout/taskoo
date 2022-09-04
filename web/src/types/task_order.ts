import { modelBaseType } from './common';

export type addTaskOrderType = {
  orderDict: {
    [statusID: string]: string;
  };
};

export type updateTaskOrderType = addTaskOrderType;

export type taskOrderType = addTaskOrderType & modelBaseType;
