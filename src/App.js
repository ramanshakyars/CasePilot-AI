import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MiniDrawer from './pages/chat';
import './App.css';

function App() {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // Light theme settings
              background: {
                default: '#f5f5f5',
                paper: '#ffffff',
              },
            }
            : {
              // Dark theme settings
              background: {
                default: '#121212',
                paper: '#1e1e1e',
              },
            }),
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                color: mode === 'dark' ? '#ffffff' : '#000000',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#1a1a1a' : '#1976d2',
                color: mode === 'dark' ? '#ffffff' : '#ffffff',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MiniDrawer mode={mode} setMode={setMode}>
        <div className="h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold">Welcome to Case Pilot</h1>
        </div>
      </MiniDrawer>
    </ThemeProvider>
  );
}

export default App;