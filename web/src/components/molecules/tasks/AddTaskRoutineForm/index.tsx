import TextField from '@mui/material/TextField';

type AddTaskRoutineFormProps = {
  title: string;
  isMini?: boolean;
  autoFocus?: boolean;
  inputValue: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
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
      autoFocus={props.autoFocus}
      size={props.isMini ? 'small' : 'medium'}
      value={props.inputValue}
      onChange={props.handleTextFieldChange}
      onKeyDown={props.handleKeyDown}
      onBlur={props.onBlur}
    />
  );
};

export default AddTaskRoutineForm;
