import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import styles from '../styles/login.module.css'

const LoginPage = () => {

  const handleLogin = async () => {
    await invoke('open_spotify_auth_window');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MUZE PLAYER</h1>
      <button onClick={handleLogin} className={styles.login}>LOGIN WITH SPOTIFY</button>
    </div>
  );
};

export default LoginPage;
