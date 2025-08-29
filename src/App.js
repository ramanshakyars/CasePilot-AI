import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MiniDrawer from './pages/chat';
import ChatPanel from './components/chatPanel';
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
          <ChatPanel />
        </div>
      </MiniDrawer>
    </ThemeProvider>
  );
}

export default App;