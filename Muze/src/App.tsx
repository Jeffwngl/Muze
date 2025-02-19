import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Icon from '../components/icons/Export';

function App() {
  const [currentTrack, setCurrentTrack] = useState('No Track');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <main className="container">
      <div className="buttons">

        {/* rewind */}
        <div className="wrapper">
          <div className="section">
            <button id='rewind'><Icon className='symbols' name="rewind" size={20} color='#bababa' pad='0 5px'></Icon></button>
          </div>
        </div>

        {/* play/pause */}
        <div className="wrapper">
          <label className="switch">
            {/* <button id='play'></button> */}
            <input type="checkbox" className="check" onChange={handlePlay}></input>
            <span className="toggle"></span>
            <div className="layout">
              <Icon className='pause' name="pause" size={20} color="#5c5c5c" pad='0 5px'></Icon>
              <Icon className='play' name="play" size={20} color='#5c5c5c' pad='0 5px'></Icon>
            </div>
          </label>  
        </div>

        {/* skip */}
        <div className="wrapper">
          <div className="section">
            <button id='skip'><Icon className='symbols' name="skip" size={20} color='#bababa' pad='0 5px'></Icon></button>
          </div>
        </div>

        {/* volume knob */}
        <div className="bigWrapper">
          <div className="wrapperSlider">
            <div className="slider">
              <div className="volumeKnob"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="songTitle">
        <p>Now playing...</p>
        <p>{currentTrack}</p>
      </div>
    </main>
  );
}

export default App;
