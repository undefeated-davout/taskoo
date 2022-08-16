import Button from '@mui/material/Button';

type BaseButtonProps = {
  children: React.ReactNode;
};

const BaseButton = (props: BaseButtonProps) => {
  return <Button variant="contained">{props.children}</Button>;
};

export default BaseButton;
