import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';

type BaseCheckboxProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BaseCheckbox = (props: BaseCheckboxProps) => {
  const theme = useTheme();
  return (
    <Checkbox
      color="default"
      icon={
        <CheckBoxOutlineBlankOutlinedIcon
          sx={{ color: theme.palette.grey[600] }}
        />
      }
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};

export default BaseCheckbox;
