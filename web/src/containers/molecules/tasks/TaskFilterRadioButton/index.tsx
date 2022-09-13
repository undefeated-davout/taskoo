import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

type TaskFilterRadioButtonProps = {
  taskCondition: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TaskFilterRadioButton = (props: TaskFilterRadioButtonProps) => {
  return (
    <FormControl>
      <RadioGroup row value={props.taskCondition} onChange={props.onChange}>
        <FormControlLabel value="all" control={<Radio />} label="ALL" />
        <FormControlLabel value="tasks" control={<Radio />} label="TASKS" />
        <FormControlLabel value="routines" control={<Radio />} label="ROUTINES" />
      </RadioGroup>
    </FormControl>
  );
};

export default TaskFilterRadioButton;
