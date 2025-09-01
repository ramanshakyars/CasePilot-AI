import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, IconButton, Typography, List, CssBaseline, Divider, ListItemIcon, ListItemText } from '@mui/material';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Add as NewIcon,
    History as HistoryIcon,
    Delete as DeleteIcon,
    Brightness4 as DarkIcon,
    Brightness7 as LightIcon
} from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import HistoryDrawer from '../components/historyDrawer';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open
        ? {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }
        : {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
}));

// Logo component
const Logo = () => (
    <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="white" strokeWidth="2" />
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2" />
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="white" />
            </svg>
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Case Pilot
        </Typography>
    </div>
);

export default function MiniDrawer({ children, mode, setMode, selectedChatId, setSelectedChatId }) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState('New');

    const handleThemeChange = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    const menuItems = [
        { text: 'New', icon: <NewIcon /> },
        { text: 'History', icon: <HistoryIcon /> },
    ];

    // <<<<---- CHANGE THIS FUNCTION ---->>>>
    const handleMenuClick = (itemText) => {
        setActive(itemText);
        if (itemText === "New") {
            setSelectedChatId(null); // clear chat on "New"
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className="flex justify-between">
                    <div className="flex items-center">
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setOpen(!open)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Logo />
                    </div>
                    <div className="flex items-center">
                        <IconButton onClick={handleThemeChange} color="inherit">
                            {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </Toolbar>
                <Divider />
                <List sx={{ mt: 1 }}>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => handleMenuClick(item.text)}
                            selected={active === item.text}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 0.5,
                                mx: 1,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'inherit',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    ))}
                </List>
                {active === 'History' && (
                    <HistoryDrawer
                        open={open}
                        setSelectedChatId={setSelectedChatId}
                    />
                )}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: 'background.default',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Toolbar />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Box>

            </Box>
        </Box>
    );
}