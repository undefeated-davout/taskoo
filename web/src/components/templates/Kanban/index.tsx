import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { UtilContext } from 'pages/_app';

import KanbanPanel from 'components/organisms/KanbanPanel';

import { kanbanStatusType } from 'types/kanban';
import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';

type KanbanProps = {};

const kanbanStatuses: kanbanStatusType[] = [
  { id: '1', orderNum: 1, name: 'DOING' },
  { id: '2', orderNum: 2, name: 'TODO' },
  { id: '3', orderNum: 3, name: 'IDEA' },
  { id: '4', orderNum: 4, name: 'CONDITIONAL' },
  { id: '80', orderNum: 5, name: 'DONE' },
];

const Kanban = (props: KanbanProps) => {
  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[] | null>(null);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, {});
    return () => unsubscribe();
  }, [user]);

  if (tasks === null) return <></>;

  const kanbanStatusTaskDict = tasks.reduce(
    (dict: { [type: string]: taskType[] }, task) => {
      const statusID = task.isDone ? kanbanStatusConst.done : task.statusID; // 完了ならDONEに読み替え
      dict[statusID] ? dict[statusID].push(task) : (dict[statusID] = [task]);
      return dict;
    },
    {},
  );

  return (
    <Box>
      <Grid container spacing={2}>
        {kanbanStatuses.map((kanbanStatus, _) => (
          <Grid key={kanbanStatus.id}>
            <KanbanPanel
              kanbanStatus={kanbanStatus}
              tasks={kanbanStatusTaskDict[kanbanStatus.id] || []}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Kanban;
