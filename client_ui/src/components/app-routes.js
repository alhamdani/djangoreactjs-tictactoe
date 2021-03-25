
import React from 'react';
import { Route, Switch } from "react-router-dom";

import TicTacToeIdx from './tictactoe/idx.js';
import PlayerLeaderboard from './tictactoe/player-leader-board.js';
function PageNotFound(){
  return(
    <div>Page not found</div>
  )
}

export default function AppRoutes(){
  
  return(
    <Switch>
      
      {/* <Route path="/" exact><PageNotFound/></Route> */}
      
      <Route path="/tictactoegame" component={TicTacToeIdx}></Route>
      <Route path="/leaderboards" component={PlayerLeaderboard}></Route>
      <Route path="/" component={PageNotFound}></Route>

      {/* <Route path="/" exact><Home/></Route>
      <Route path="/main"><Main/></Route>
      <RoutesContructor routeList={all_routes}/> */}
    </Switch>
  )
}
