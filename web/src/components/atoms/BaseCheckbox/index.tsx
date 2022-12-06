import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import Checkbox from '@mui/material/Checkbox';
import { Theme, useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

type BaseCheckboxProps = {
  sx?: SxProps<Theme>;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BaseCheckbox = (props: BaseCheckboxProps) => {
  const theme = useTheme();
  return (
    <Checkbox
      sx={props.sx}
      color="default"
      icon={<CheckBoxOutlineBlankOutlinedIcon sx={{ color: theme.palette.grey[600] }} />}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};

export default BaseCheckbox;
