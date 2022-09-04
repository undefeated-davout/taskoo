import { useContext } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';

import { UtilContext } from 'pages/_app';

import HeaderBar from 'components/organisms/common/HeaderBar';
import SideBar, { DrawerHeader } from 'components/organisms/common/SideBar';

type MenuContainerProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
};

const MenuContainer = (props: MenuContainerProps) => {
  const theme = useTheme();
  const { isMenuOpen, setIsMenuOpen } = useContext(UtilContext);
  const toggleSideBarOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderBar
        onClickEvent={toggleSideBarOpen}
        isLoggedIn={props.isLoggedIn}
      />
      {props.isLoggedIn && <SideBar open={isMenuOpen}></SideBar>}
      <Box
        component="main"
        sx={{ flexGrow: 1, height: '100vh', backgroundColor: 'gray' }}
      >
        <DrawerHeader />
        {/* メインコンテンツ */}
        <Box
          sx={{
            p: 1,
            height: `calc(100% - ${theme.spacing(7)})`,
            [theme.breakpoints.up('sm')]: {
              height: `calc(100% - ${theme.spacing(8)})`,
            },
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
