// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri::webview::WebviewWindowBuilder;
use url::Url;
use dotenv::dotenv;

#[tauri::command]
async fn open_spotify_auth_window(app: tauri::AppHandle) -> Result<(), String> {
    dotenv().ok(); 
    // debug
    let redirect_uri = std::env::var("SPOTIFY_REDIRECT_URI").unwrap_or_default();
    println!("Redirect URI: {}", redirect_uri);
    let client_id = std::env::var("SPOTIFY_CLIENT_ID").unwrap_or_default();
    println!("Client ID: {}", client_id);

    let auth_url = format!(
        "https://accounts.spotify.com/authorize?client_id={}&response_type=code&redirect_uri={}&scope=user-read-playback-state%20user-modify-playback-state",
        std::env::var("SPOTIFY_CLIENT_ID").unwrap_or_default(),
        std::env::var("SPOTIFY_REDIRECT_URI").unwrap_or_default()
    );
    println!("Auth_URL: {}", auth_url);

    let url = Url::parse(&auth_url).map_err(|e| e.to_string())?;
    println!("url: {}", url);
    WebviewWindowBuilder::new(&app, "spotify-auth", tauri::WebviewUrl::External(url))
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
