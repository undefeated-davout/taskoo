import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
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
import SideMenuList from 'components/molecules/SideMenuList';
import { useRouter } from 'next/router';

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

// --- component ---
const SideBar = (props: SideBarProps) => {
  const router = useRouter();
  const pageKey = router.pathname.slice(1, router.pathname.length);

  const menuList: { key: string; icon: JSX.Element }[] = [
    { key: 'focus', icon: <FilterCenterFocusIcon></FilterCenterFocusIcon> },
    { key: 'pomodoro', icon: <TimerOutlinedIcon></TimerOutlinedIcon> },
    {
      key: 'tasks',
      icon: <FormatListBulletedOutlinedIcon></FormatListBulletedOutlinedIcon>,
    },
    { key: 'routine', icon: <RepeatOutlinedIcon></RepeatOutlinedIcon> },
    { key: 'kanban', icon: <ViewKanbanOutlinedIcon></ViewKanbanOutlinedIcon> },
    {
      key: 'calendar',
      icon: <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>,
    },
  ];

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader></DrawerHeader>
      <Divider />
      <List>
        {menuList.map((menuItem, index) => (
          <SideMenuList
            key={menuItem.key}
            keyName={menuItem.key}
            icon={menuItem.icon}
            index={index}
            isSideBarOpen={props.open}
            selected={pageKey === menuItem.key}
          ></SideMenuList>
        ))}
      </List>
      <Divider />
      <List>
        {['logout'].map((key, index) => (
          <SideMenuList
            key={key}
            keyName={key}
            icon={<LogoutOutlinedIcon></LogoutOutlinedIcon>}
            index={index}
            isSideBarOpen={props.open}
            selected={false}
          ></SideMenuList>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
