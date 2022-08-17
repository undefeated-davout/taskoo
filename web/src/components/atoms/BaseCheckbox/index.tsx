import { useTheme } from '@mui/material/styles';

import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

type BaseCheckboxProps = {};

const BaseCheckbox = (props: BaseCheckboxProps) => {
  const theme = useTheme();
  return (
    <Checkbox
      icon={
        <CheckBoxOutlineBlankOutlinedIcon
          sx={{ color: theme.palette.grey[600] }}
        />
      }
    ></Checkbox>
  );
};

export default BaseCheckbox;
