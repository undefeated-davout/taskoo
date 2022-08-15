import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import Link from 'next/link';

type SideBarProps = {
  isSideBarOpen: boolean;
};

const SideBar = (props: SideBarProps) => {
  const list = () => (
    <Box sx={{ mt: '64px', width: 240 }} role="presentation">
      <List>
        {['focus', 'pomodoro', 'tasks', 'kanban', 'calendar'].map(
          (key, index) => (
            <ListItem key={key} disablePadding>
              <Link href={`/${key}`}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={key.toUpperCase()}
                    primaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ),
        )}
        <Divider></Divider>
        {['LOGOUT'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ fontSize: '0.8rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <Drawer open={props.isSideBarOpen}>{list()}</Drawer>
      </div>
    </>
  );
};

export default SideBar;
