import React from 'react';
import MiniDrawer from './pages/chat';
import './App.css';

function App() {
  return (
    <MiniDrawer>
      {/* This section will replace your current CRA template */}
      <div className="App">
        <header className="App-header">
          <h1>Welcome to AI Test Case Generator</h1>
          {/* Add any welcome content or landing UI */}
        </header>
      </div>
    </MiniDrawer>
  );
}

export default App;
