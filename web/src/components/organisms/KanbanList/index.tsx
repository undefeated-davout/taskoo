import { useContext, useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import AddTaskForm from 'components/molecules/AddTaskForm';
import TaskList from 'components/organisms/TaskList';

import { taskType } from 'types/task';

import { getTasks } from 'lib/api/task';

type KanbanListProps = {
  title: string;
};

const KanbanList = (props: KanbanListProps) => {
  const theme = useTheme();

  const { user } = useContext(UtilContext);
  const [tasks, setTasks] = useState<taskType[] | null>(null);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  useEffect(() => {
    const unsubscribe = getTasks(user!.uid, setTasks);
    return () => unsubscribe();
  }, [user]);

  if (tasks === null) return <></>;

  return (
    <Card
      sx={{
        width: 280,
        p: 1,
        backgroundColor: theme.palette.action.disabledBackground,
      }}
    >
      {/* タイトル */}
      <Typography sx={{ fontSize: 14, fontWeight: 100 }}>
        {props.title}
      </Typography>

      {/* タスクリスト */}
      <TaskList isMini={true} tasks={tasks} />

      {/* タスク入力欄 */}
      {isOpenAddForm ? (
        <>
          <Box sx={{ mt: 2 }} />
          <AddTaskForm isMini={true} onBlur={() => setIsOpenAddForm(false)} />
        </>
      ) : (
        <>
          <Box sx={{ mt: 1 }} />
          <Button
            sx={{ width: '100%', justifyContent: 'flex-start', pl: 0 }}
            onClick={() => setIsOpenAddForm(true)}
          >
            <AddIcon sx={{ mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 100 }}>
              ADD TASK
            </Typography>
          </Button>
        </>
      )}
    </Card>
  );
};

export default KanbanList;
