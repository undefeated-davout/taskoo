import { useState } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';

import HeaderBar from 'containers/organisms/common/HeaderBar';
import SideBar, { DrawerHeader } from 'containers/organisms/common/SideBar';

type MenuContainerProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
};

const MenuContainer = (props: MenuContainerProps) => {
  const theme = useTheme();
  const [cookies, setCookie, _] = useCookies(['isOpenMenu']);
  const [isMenuOpen, setIsMenuOpen] = useState(cookies.isOpenMenu === 'true');
  const toggleSideBarOpen = () => {
    setCookie('isOpenMenu', !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderBar onClickEvent={toggleSideBarOpen} isLoggedIn={props.isLoggedIn} />
      {props.isLoggedIn && <SideBar open={isMenuOpen}></SideBar>}
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', backgroundColor: 'gray' }}>
        <DrawerHeader />
        {/* メインコンテンツ */}
        <Box
          sx={{
            p: 1,
            height: `calc(100% - ${theme.spacing(8)})`,
            [theme.breakpoints.down('sm')]: { height: `calc(100% - ${theme.spacing(7)})` },
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuContainer;
