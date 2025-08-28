import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
    palette: {
        mode,
        primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
        },
        secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#dc004e',
        },
        ...(mode === 'light'
            ? {
                // Light theme settings
                background: {
                    default: '#f8f9fa',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#1a1a1a',
                    secondary: '#4a4a4a',
                },
            }
            : {
                // Dark theme settings
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
                text: {
                    primary: '#ffffff',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                },
            }),
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                    color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
                    border: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'dark' ? '#1a1a1a' : '#1976d2',
                    color: mode === 'dark' ? '#ffffff' : '#ffffff',
                    boxShadow: mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    margin: '4px 8px',
                    '&.Mui-selected': {
                        backgroundColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.16)' : 'rgba(25, 118, 210, 0.12)',
                        color: mode === 'dark' ? '#90caf9' : '#1976d2',
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.24)' : 'rgba(25, 118, 210, 0.20)',
                        },
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
        },
    },
});

export default getTheme;