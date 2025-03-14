import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  if (!songsData.length) {
    return <div>Loading...</div>; // Only show loading if songsData is empty
  }

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <Player />
      {track && <audio ref={audioRef} src={track.file} preload='auto'></audio>}
    </div>
  );
};

export default App;
