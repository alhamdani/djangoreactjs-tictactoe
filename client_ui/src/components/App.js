import React from 'react';
import { Link } from "react-router-dom";

import AppRoutes from './app-routes.js';

function App() {
  return (
    <div>
      <div className="nav-top">
        <Link to = '/tictactoegame' style={{marginRight : '5px'}}>Game</Link>
        <Link to = '/leaderboards'>Leaderboards</Link>
      </div>
      <div style={{marginTop:'55px'}}>
        <AppRoutes/>
      </div>
    </div>
  );
}

export default App;
