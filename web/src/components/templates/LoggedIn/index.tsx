import { useState } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import HeaderBar from 'components/organisms/HeaderBar';
import SideBar, { DrawerHeader } from 'components/organisms/SideBar';

type LoggedInProps = {
  children: React.ReactNode;
};

const LoggedIn = (props: LoggedInProps) => {
  const [open, setOpen] = useState(true);
  const toggleSideBarOpen = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderBar onClickEvent={toggleSideBarOpen}></HeaderBar>
      <SideBar open={open}></SideBar>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};

export default LoggedIn;
