import { UtilContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import CenterContainerBox from 'components/atoms/CenterContainerBox';
import Task from 'components/molecules/Task';

import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';

type FocusProps = {};

const Focus = (props: FocusProps) => {
  const theme = useTheme();

  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks);
    return () => unsubscribe();
  }, []);

  return (
    <CenterContainerBox>
      <Card
        sx={{
          p: 2,
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.action.disabledBackground,
        }}
      >
        {tasks.length === 0 ? (
          <Typography variant="h6" sx={{ fontWeight: 100 }}>
            NO TASKS IN "DOING".
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 100 }}>
            FOCUS ON THE TASK.
            <br />
            REMAINING: {tasks.length}
          </Typography>
        )}

        {tasks.length > 0 && (
          <>
            <Box sx={{ mt: 2 }}></Box>
            <Task task={tasks[0]} />
          </>
        )}
      </Card>
    </CenterContainerBox>
  );
};

export default Focus;
