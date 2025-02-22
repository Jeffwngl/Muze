import React from 'react';
import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { spotifyApi } from '../spotifyApi';
import { PlaybackState } from '../types';

import Icon from './icons/Export';
import styles from '../styles/miniplayer.module.css';

interface MiniplayerProps {
  onLogout?: () => void;
}

const MiniPlayer = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [volume, setVolume] = useState<number>(100);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const state = await spotifyApi.getPlaybackState();
  //     setPlaybackState(state);
  //   }, 1000)
  // })

  return (
    <div className={styles.container}>

      {/* display */}
      {playbackState ? (
        <>
          <div className={styles.buttons}>

            {/* rewind */}
            <div className={styles.wrapper}>
              <div className={styles.section}>
                <button id='rewind' onClick={() => spotifyApi.previous()}>
                  <Icon className='symbols' name="rewind" size={20} color='#bababa' pad='0 5px'></Icon>
                </button>
              </div>
            </div>
    
            {/* play/pause */}
            <div className={styles.wrapper}>
              <label className={styles.switch}>
                <input type="checkbox" className={styles.check} onChange={() => playbackState?.is_playing ? spotifyApi.pause() : spotifyApi.play()}></input>
                <span className={styles.toggle}></span>
                <div className={styles.layout}>
                  <Icon className='pause' name="pause" size={20} color="#5c5c5c" pad='0 5px'></Icon>
                  <Icon className='play' name="play" size={20} color='#5c5c5c' pad='0 5px'></Icon>
                </div>
              </label>  
            </div>
    
            {/* skip */}
            <div className={styles.wrapper}>
              <div className={styles.section}>
                <button id='skip' onClick={() => {spotifyApi.next}}>
                  <Icon className='symbols' name="skip" size={20} color='#bababa' pad='0 5px'></Icon>
                </button>
              </div>
            </div>
    
            {/* volume knob */}
            <div className={styles.bigWrapper}>
              <div className={styles.sliderWrapper}>
                <div className={styles.slider}>
                  <div className={styles.volumeKnob}></div>
                </div>
              </div>
            </div>
          </div>

          {/* footer display */}
          <div className={styles.footer}>
            <p>Now playing... &nbsp;</p>
            <p>{playbackState.item.name}</p>
            <p>By &nbsp;</p>
            <p>{playbackState.item.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        </>
      ) : (
        <div className={styles.footer}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default MiniPlayer;