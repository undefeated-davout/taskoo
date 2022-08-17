import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Task from 'components/molecules/Task';

type TaskListProps = {};

const TaskList = (props: TaskListProps) => {
  return (
    <List sx={{ width: '100%' }}>
      {[1, 2, 3].map((key, index) => (
        <ListItem
          key={key}
          disablePadding
          sx={{ display: 'block', mt: 1, height: 50 }}
        >
          <Task key={key}></Task>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
