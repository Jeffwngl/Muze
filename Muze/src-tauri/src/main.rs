// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri::webview::{WebviewWindowBuilder, WebviewUrl};

#[tauri::command]
async fn open_spotify_auth_window(app: tauri::AppHandle) -> Result<(), String> {
    let auth_url = "https://accounts.spotify.com/authorize?client_id=your_client_id_here&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-playback-state%20user-modify-playback-state";
    println!("Auth URL: {}", auth_url);

    let url = WebviewUrl::from_string(auth_url).map_err(|e| e.to_string())?;
    let window = WebviewWindowBuilder::new(&app, "spotify-auth", url)
        .build()
        .map_err(|e| e.to_string())?;
    println!("Window opened successfully");

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_spotify_auth_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    // muze_lib::run()
}
