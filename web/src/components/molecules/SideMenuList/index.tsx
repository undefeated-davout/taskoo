import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

type SideMenuListProps = {
  keyName: string;
  icon: JSX.Element;
  index: number;
  isSideBarOpen: boolean;
  selected: boolean;
};

const SideMenuList = (props: SideMenuListProps) => {
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      sx={{
        display: 'block',
        backgroundColor: props.selected
          ? theme.palette.action.selected
          : undefined,
      }}
    >
      <Link href={`/${props.keyName}`}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.isSideBarOpen ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.isSideBarOpen ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {props.icon}
          </ListItemIcon>
          <ListItemText
            primary={props.keyName.toUpperCase()}
            primaryTypographyProps={{ fontSize: '0.8rem' }}
            sx={{ opacity: props.isSideBarOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SideMenuList;
