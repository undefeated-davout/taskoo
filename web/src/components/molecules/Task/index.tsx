import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';

type TaskProps = {};

const Task = (props: TaskProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: '100%',
        color: theme.palette.common.black,
        backgroundColor: theme.palette.grey[200],
      }}
    >
      テスト
    </Card>
  );
};

export default Task;
