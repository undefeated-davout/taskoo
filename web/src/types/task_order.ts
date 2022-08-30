import { idType, metaType } from './common';

export type addTaskOrderType = {
  orderDict: {
    [statusID: string]: string;
  };
};

export type updateTaskOrderType = {
  orderDict: {
    [statusID: string]: string;
  };
};

export type taskOrderType = addTaskOrderType & idType & metaType;
