import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider
} from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(6)} + 1px)`
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && { marginLeft: drawerWidth, width: `calc(100% - ${drawerWidth}px)` })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open
    ? { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }
    : { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }
  )
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            AI Test Case Generator
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: { backgroundColor: 'black', color: 'white' },
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
        <Divider sx={{ bgcolor: 'grey.800' }} />

        <List>
          {['New', 'History', 'Delete'].map((text, idx) => (
            <ListItem key={text} disablePadding>
              <ListItemIcon sx={{ color: 'white' }}>
                {idx % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
