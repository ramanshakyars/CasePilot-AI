import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MiniDrawer from './pages/chat';
import getTheme from './common/theme';
import './App.css';

function App() {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MiniDrawer mode={mode} setMode={setMode}>
        <div className="h-full flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold mb-4">Welcome to Case Pilot</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your intelligent assistant for case management and analysis.
              Start a new case or review your history from the sidebar.
            </p>
          </div>
        </div>
      </MiniDrawer>
    </ThemeProvider>
  );
}

export default App;