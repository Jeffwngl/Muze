# map for ts converting .env to ts readable variables
declare namespace NodeJS {
  interface ProcessEnv {
    SPOTIFY_CLIENT_ID?: string;
    SPOTIFY_CLIENT_SECRET?: string;
    SPOTIFY_REDIRECT_URI?: string;
  }
}