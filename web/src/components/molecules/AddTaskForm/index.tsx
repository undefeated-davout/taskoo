import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

type AddTaskFormProps = {};

const AddTaskForm = (props: AddTaskFormProps) => {
  const theme = useTheme();

  return <TextField label="ENTER YOUR TASK" variant="outlined" fullWidth />;
};

export default AddTaskForm;
