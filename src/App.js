import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MiniDrawer from './pages/chat';
import './App.css';
import theme from './common/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer>
        <div className="h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold">Welcome to Case Pilot</h1>
        </div>
      </MiniDrawer>
    </ThemeProvider>
  );
}

export default App;
