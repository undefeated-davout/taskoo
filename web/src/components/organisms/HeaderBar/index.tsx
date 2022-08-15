import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type HeaderBarProps = {
  onClickEvent: VoidFunction;
};

const HeaderBar = (props: HeaderBarProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.onClickEvent}
          edge="start"
          sx={{ marginRight: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 100 }}
        >
          TASKOO
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
