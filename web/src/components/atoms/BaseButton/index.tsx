import Button from '@mui/material/Button';

type BaseButtonProps = {
  children: React.ReactNode;
  onClick: VoidFunction;
};

const BaseButton = (props: BaseButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{ textTransform: 'none' }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default BaseButton;
