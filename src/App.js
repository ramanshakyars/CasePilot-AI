import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MiniDrawer from './pages/chat';
import ChatPanel from './components/chatPanel';
import getTheme from './common/theme';
import './App.css';
import LoaderOverlay from './components/loaderOverlays';
import httpService, { configureLoading } from './services/httpService';

function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const [globalLoading, setGlobalLoading] = useState(false);

  // <<<<---- NEW STATE ---->>>>
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    configureLoading(setGlobalLoading);
  }, []);

  return (
    <>
      <LoaderOverlay open={globalLoading} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MiniDrawer
          mode={mode}
          setMode={setMode}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        >
          <div className="h-full w-full flex flex-col">
            <ChatPanel chatId={selectedChatId} />
          </div>
        </MiniDrawer>
      </ThemeProvider>
    </>
  );
}

export default App;