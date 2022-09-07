import TextField from '@mui/material/TextField';

type AddTaskRoutineFormProps = {
  title: string;
  isMini?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputValue: string;
  handleTextFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const AddTaskRoutineForm = (props: AddTaskRoutineFormProps) => {
  return (
    <TextField
      label={props.title}
      variant="outlined"
      fullWidth
      autoComplete="off"
      autoFocus
      size={props.isMini ? 'small' : 'medium'}
      value={props.inputValue}
      onChange={props.handleTextFieldChange}
      onKeyDown={props.handleKeyDown}
      onBlur={props.onBlur}
    />
  );
};

export default AddTaskRoutineForm;
