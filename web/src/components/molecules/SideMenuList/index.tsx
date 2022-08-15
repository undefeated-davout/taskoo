import Link from 'next/link';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';

type SideMenuListProps = {
  keyName: string;
  index: number;
  open: boolean;
};

const SideMenuList = (props: SideMenuListProps) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link href={`/${props.keyName}`}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {props.index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText
            primary={props.keyName.toUpperCase()}
            primaryTypographyProps={{ fontSize: '0.8rem' }}
            sx={{ opacity: props.open ? 1 : 0 }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SideMenuList;
