import { modelBaseType } from './common';

export type addTaskType = {
  statusID: string;
  title: string;
  isChecked: boolean;
};

export type updateTaskType = Partial<addTaskType>;

export type taskType = addTaskType & modelBaseType;

export type statusIDTasksType = { [statusID: string]: taskType[] };

export type kanbanTaskStateType = {
  taskOrderID: string;
  statusIDTasks: statusIDTasksType;
};
