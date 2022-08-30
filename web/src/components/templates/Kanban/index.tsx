import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';

import { UtilContext } from 'pages/_app';

import KanbanPanel from 'components/organisms/tasks/KanbanPanel';

import { kanbanStatusType } from 'types/kanban';
import { taskType } from 'types/task';
import { taskOrderType } from 'types/task_order';

import { getTasks } from 'lib/api/task';
import { getTaskOrder } from 'lib/api/task_order';
import { sortStatusIDTasks } from 'lib/models/task';
import { kanbanTaskState } from 'lib/recoil/kanbanTask';

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
  const [taskOrder, setTaskOrder] = useState<taskOrderType | null>(null);
  const [kanbanTask, setKanbanTask] = useRecoilState(kanbanTaskState);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

  useEffect(() => setKanbanTask(null), []);
  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, {});
    return () => unsubscribe();
  }, [user]);
  useEffect(() => {
    const unsubscribe = getTaskOrder(user!.uid, setTaskOrder);
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!tasks) return;
    const sortedStatusIDTasks = sortStatusIDTasks(tasks, taskOrder);
    setKanbanTask({
      taskOrderID: taskOrder?.id ?? '',
      statusIDTasks: sortedStatusIDTasks,
    });
  }, [tasks, taskOrder, setKanbanTask]);

  if (tasks === null || kanbanTask === null) return <></>;

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <Switch
                name="displayDeleteButton"
                color="success"
                checked={displayDeleteButton}
                onChange={(event) =>
                  setDisplayDeleteButton(event.target.checked)
                }
              />
            }
            label={<DeleteOutlineOutlinedIcon sx={{ mt: 0.6 }} />}
          />
        </Box>

        <Grid container spacing={2}>
          {kanbanStatuses.map((kanbanStatus, _) => (
            <Grid key={kanbanStatus.id}>
              <KanbanPanel
                kanbanStatus={kanbanStatus}
                tasks={kanbanTask.statusIDTasks[kanbanStatus.id] ?? []}
                displayDeleteButton={displayDeleteButton}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Kanban;
