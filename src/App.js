import React from 'react';
import './App.css';
import AuthPage from './components/auth-page';
import TerminalPage from './components/terminal-page';
import Sidebar from './components/sidebar';
import BuyersPage from './components/buyers-page';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/login" component={AuthPage} />
      <Route path="/terminals" component={TerminalPage} />
      <Route path="/" component={Sidebar} />
      <Route path="/buyers" component={BuyersPage} />
    </div>
  );
}

export default App;
