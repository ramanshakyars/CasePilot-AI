import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MiniDrawer from './pages/chat';
import './App.css';
import theme from './common/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer>
        {/* Your landing page or chat UI goes here */}
        <div className="App">
          <header className="App-header">
            <h1>Welcome to AI Test Case Generator</h1>
          </header>
        </div>
      </MiniDrawer>
    </ThemeProvider>
  );
}

export default App;
