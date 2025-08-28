import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  CssBaseline,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import HistoryDrawer from '../components/historyDrawer';

const drawerWidth = 200;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});
const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(6)} + 1px)`
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && { marginLeft: drawerWidth, width: `calc(100% - ${drawerWidth}px)` })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open
    ? { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }
    : { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) })
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('New');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Case Pilot
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { backgroundColor: 'black', color: 'white' } }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
        <Divider sx={{ bgcolor: 'grey.800' }} />
        <List>
          {['New', 'History', 'Delete'].map(text => (
            <ListItemButton
              key={text}
              onClick={() => setActive(text)}
              sx={{ pl: open ? 4 : 2 }}
            >
              {open && (
                <Typography sx={{ color: 'white' }}>{text}</Typography>
              )}
            </ListItemButton>
          ))}
        </List>
        {active === 'History' && <HistoryDrawer open={open} />}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
