import { useContext, useEffect, useState } from 'react';

import HandymanIcon from '@mui/icons-material/Handyman';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { UtilContext } from 'pages/_app';

import KanbanPanel from 'components/organisms/KanbanPanel';
import KanbanToolDialog from 'components/organisms/KanbanToolDialog';

import { kanbanStatusType } from 'types/kanban';
import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';
import { replaceStatusID } from 'lib/models/task';

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
  const [isOpenToolDialog, setIsOpenToolDialog] = useState(false);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks, {});
    return () => unsubscribe();
  }, [user]);

  if (tasks === null) return <></>;

  const kanbanStatusTaskDict = tasks.reduce(
    (dict: { [type: string]: taskType[] }, task) => {
      const statusID = replaceStatusID(task.isDone, task.statusID);
      dict[statusID] ? dict[statusID].push(task) : (dict[statusID] = [task]);
      return dict;
    },
    {},
  );

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpenToolDialog(true)}>
            <HandymanIcon />
          </Button>
        </Box>

        <Grid container spacing={2}>
          {kanbanStatuses.map((kanbanStatus, _) => (
            <Grid key={kanbanStatus.id}>
              <KanbanPanel
                kanbanStatus={kanbanStatus}
                tasks={kanbanStatusTaskDict[kanbanStatus.id] || []}
                displayDeleteButton={displayDeleteButton}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <KanbanToolDialog
        displayDeleteButton={displayDeleteButton}
        isOpen={isOpenToolDialog}
        onClose={({ displayDeleteButton }) => {
          setDisplayDeleteButton(displayDeleteButton);
          setIsOpenToolDialog(false);
        }}
      />
    </>
  );
};

export default Kanban;
