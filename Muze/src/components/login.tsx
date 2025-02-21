import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import styles from '../styles/login.module.css'

const LoginPage = () => {

  const handleLogin = async () => {
    await invoke('open_spotify_auth_window');
  }

  return (
    <div>
      <h1>Login to Spotify</h1>
      <button onClick={handleLogin} className={styles.login}>Login with Spotify</button>
    </div>
  );
};

export default LoginPage;
