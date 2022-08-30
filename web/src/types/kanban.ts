export type kanbanStatusType = {
  id: string;
  orderNum: number;
  name: string;
};

export const DnDItems = {
  Task: 'Task',
} as const;

export type DnDItems = typeof DnDItems[keyof typeof DnDItems];

export type DropResult = {
  panelID: string;
  taskID: string;
};
