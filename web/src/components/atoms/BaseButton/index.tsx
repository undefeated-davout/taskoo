import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

type BaseButtonProps = {
  children: React.ReactNode;
  onClick: VoidFunction;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
  sx?: SxProps<Theme>;
};

const BaseButton = (props: BaseButtonProps) => {
  return (
    <Button
      color={props.color ?? 'primary'}
      variant="contained"
      sx={{ textTransform: 'none', ...props.sx }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default BaseButton;
