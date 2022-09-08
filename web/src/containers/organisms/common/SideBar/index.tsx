import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { CSSObject, Theme, styled } from '@mui/material/styles';

import SideMenuList from 'components/molecules/common/SideMenuList';

import { auth } from 'lib/infrastructure/firebase';

const drawerWidth = 200;

type SideBarProps = {
  open: boolean;
};

// --- styles ---
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar, // necessary for content to be below app bar
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

type menuType = { key: string; icon: JSX.Element; onClick?: VoidFunction };

// --- component ---
const SideBar = (props: SideBarProps) => {
  const router = useRouter();
  const pageKey = router.pathname.slice(1, router.pathname.length);

  const firstMenuList = useMemo(
    (): menuType[] => [
      { key: 'focus', icon: <FilterCenterFocusIcon /> },
      { key: 'doing', icon: <FormatListBulletedOutlinedIcon /> },
      { key: 'routine', icon: <RepeatOutlinedIcon /> },
      { key: 'kanban', icon: <ViewKanbanOutlinedIcon /> },
      { key: 'pomodoro', icon: <TimerOutlinedIcon /> },
    ],
    [],
  );
  const secondMenuList: menuType[] = [
    {
      key: 'logout',
      icon: <LogoutOutlinedIcon />,
      onClick: () => {
        signOut(auth)
          .then(() => router.push('/login'))
          .catch((err) => alert(err));
      },
    },
  ];

  // 上下キーでメニューを遷移する
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        const nowIndex = firstMenuList.findIndex((menu) => menu.key === pageKey);
        nowIndex < firstMenuList.length - 1
          ? router.push(firstMenuList[nowIndex + 1].key)
          : router.push(firstMenuList[0].key);
      } else if (event.key === 'ArrowUp') {
        const nowIndex = firstMenuList.findIndex((menu) => menu.key === pageKey);
        nowIndex > 0
          ? router.push(firstMenuList[nowIndex - 1].key)
          : router.push(firstMenuList[firstMenuList.length - 1].key);
      }
    },
    [firstMenuList, pageKey, router],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
  }, [handleKeyDown]);

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader />
      <Divider />
      <List>
        {firstMenuList.map((menuItem, index) => (
          <SideMenuList
            key={menuItem.key}
            keyName={menuItem.key}
            icon={menuItem.icon}
            onClick={menuItem.onClick}
            index={index}
            isSideBarOpen={props.open}
            selected={pageKey === menuItem.key}
          />
        ))}
      </List>
      <Divider />
      <List>
        {secondMenuList.map((menuItem, index) => (
          <SideMenuList
            key={menuItem.key}
            keyName={menuItem.key}
            icon={menuItem.icon}
            onClick={menuItem.onClick}
            index={index}
            isSideBarOpen={props.open}
            selected={false}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
