import Link from 'next/link';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';

type SideMenuListProps = {
  keyName: string;
  icon: JSX.Element;
  onClick?: VoidFunction;
  index: number;
  isSideBarOpen: boolean;
  selected: boolean;
};

const MenuElem = (props: {
  path: string;
  onClick?: VoidFunction;
  children: React.ReactNode;
}) => {
  return (
    <>
      {props.onClick ? (
        <div onClick={props.onClick}>{props.children}</div>
      ) : (
        <Link href={props.path}>{props.children}</Link>
      )}
    </>
  );
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
      <MenuElem path={`/${props.keyName}`} onClick={props.onClick}>
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
      </MenuElem>
    </ListItem>
  );
};

export default SideMenuList;
