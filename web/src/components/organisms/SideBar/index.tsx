import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

type SideBarProps = {};

const SideBar = (props: SideBarProps) => {
  const list = () => (
    <Box sx={{ mt: '64px', width: 240 }} role="presentation">
      <List>
        {['FOCUS', 'POMODORO', 'TASKS', 'KANBAN', 'CALENDAR'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <Drawer open={true}>{list()}</Drawer>
      </div>
    </>
  );
};

export default SideBar;
