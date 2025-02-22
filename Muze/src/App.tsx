import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import styles from "./App.module.css";
import MiniPlayer from "./components/miniplayer";
import { PlaybackState } from "./types";
import { spotifyApi } from "./spotifyApi";
import LoginPage from "./components/login";

// React.FC is a simple way to write React screens
const App: React.FC = () => {
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [volume, setVolume] = useState<number>(100);

  // Runs when isValidated changes
  useEffect(() => {
    // Looks at the web address (URL) to see if Spotify sent us a special ticket (called a code) after we logged in.
    // window.location.search: Grabs extra stuff from the URL (like ?code=abc123).
    // new URLSearchParams: Turns that stuff into a little list we can read.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(`ParamL:`, urlParams);
    console.log('URL code:', code);

    if (code && !isValidated) {
      // spotifyApi.authenticate(code): Hands the ticket to our Spotify remote (from spotifyApi.ts) to swapped for a key (token).
      spotifyApi.authenticate(code).then(() => {
        setIsValidated(true);
        // window.history.pushState({}, document.title, '/'): Cleans up the URL (removes ?code=abc123) so it’s just http://localhost:xxxx.
        window.history.pushState({}, document.title, '/');
        console.log('Authentication successful');
      }).catch(error => {
        console.error('Authentication failed:', error);
      });
    }

    // if user has already logged in it will automatically switch to true
    else if (localStorage.getItem('spotify_token')) {
      setIsValidated(true);
    }

    // if logged in
    if (isValidated) {
      // checks for playback state every second
      const interval = setInterval(async () => {
        const state = await spotifyApi.getPlaybackState();
        setPlaybackState(state);
      }, 1000);

      // when the program shuts, we stop checking
      return () => clearInterval(interval);
    }

  }, [isValidated])

  if (!isValidated) {
    return (
      <LoginPage />
    )
  }

  return (
    <div>
      <MiniPlayer />
    </div>
  );
}

export default App;
