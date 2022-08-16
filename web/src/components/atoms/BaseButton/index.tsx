import Button from '@mui/material/Button';

type BaseButtonProps = {
  children: React.ReactNode;
  onClick: VoidFunction;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
};

const BaseButton = (props: BaseButtonProps) => {
  return (
    <Button
      color={props.color ?? 'inherit'}
      variant="contained"
      sx={{ textTransform: 'none' }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default BaseButton;
