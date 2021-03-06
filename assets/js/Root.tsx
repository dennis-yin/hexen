import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Hand from './components/Hand';
import Reward from './components/Reward';
import useHexData from './hooks/useHexData';
import '../css/Root.css';

const Root: React.FC = () => {
  // const getInitialBoardFromUser = (id: any) => {
  //   fetch(`api/map/${id}`)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(response => {
  //       dispatch({ type: SET_INITIAL, data: response.data });
  //     });
  // };

  const playerInfo = { id: 1, hex_id: 291 };
  const { state, selectCard, targetHex, targetUser, clearReward } = useHexData(
    playerInfo
  );

  return (
    <div className="root-area">
      <div className="play-area">
        <Sidebar state={state} targetHex={targetHex} targetUser={targetUser} />
        <div className="board-area">
          <Reward state={state} clearReward={clearReward} />
          <Map state={state} targetHex={targetHex} />
          <Hand state={state} selectCard={selectCard} />
        </div>
      </div>
    </div>
  );
};

export default Root;
