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

export type kanbanStatusType = {
  id: string;
  orderNum: number;
  name: string;
};

export const DnDItems = {
  Task: 'Task',
  Routine: 'Routine',
} as const;

export type DnDItems = typeof DnDItems[keyof typeof DnDItems];

export type DropTaskResult = {
  panelID: string;
  taskID: string;
  isSetNext: boolean;
};
