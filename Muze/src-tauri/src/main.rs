// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
async fn open_spotify_auth_window(app: tauri::AppHandle) -> Result<(), String> {
    let auth_url = format!(
        "https://accounts.spotify.com/authorize?client_id={}&response_type=code&redirect_uri={}&scope=user-read-playback-state%20user-modify-playback-state",
        std::env::var("SPOTIFY_CLIENT_ID").unwrap_or_default(),
        std::env::var("SPOTIFY_REDIRECT_URI").unwrap_or_default()
    );

    tauri::WindowBuilder::new(&app, "spotify-auth", tauri::WindowUrl::External(auth_url.parse().unwrap()))
        .build()
        .map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_spotify_auth_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    // muze_lib::run()
}
