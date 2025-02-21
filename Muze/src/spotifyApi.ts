import axios from 'axios';
import { SpotifyToken, PlaybackState } from './types';

// axios is a tool that fetches stuff from the internet (like asking Spotify for a token).
// Simple Explanation: This is like the remote of our toy that talks to Spotify:
// authenticate: Uses the code from the login window to get a VIP pass (token).
// getPlaybackState: Asks Spotify, "What’s playing right now?"
// play, pause, next, previous, setVolume: Sends commands to Spotify like "Play!" or "Turn it up!"

// Promise expects the variable that is put in it
// async: Means it can wait for Spotify to reply without freezing the app.

// axios.get<PlaybackState>: Sends a “get” request to Spotify
// URL: https://api.spotify.com/v1/me/player.
// headers: { Authorization: ... }: Shows our token to prove we’re allowed in.
// <PlaybackState>: Expects a reply matching our PlaybackState type.
// return response.data: Sends back the info (e.g., is_playing, song name).

// axios.put: Sends a “put” command (like updating something):
// URL: https://api.spotify.com/v1/me/player/play.
// {}: No extra info needed—just “play!”
// headers: Uses the token to get permission.

export class SpotifyApi {
    private token: string | null = null;

    async authenticate(code: string): Promise<void> {
        const clientId = import.meta.env.SPOTIFY_CLIENT_ID as string | undefined;
        const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET as string | undefined;
        const redirectUri = import.meta.env.SPOTIFY_REDIRECT_URL as string | undefined;

        if (!clientId || !clientSecret || !redirectUri) {
            throw new Error("Missing environment variables");
        }

        const response = await axios.post<SpotifyToken>('https://accounts.spotify.com/api/token', {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        });

        this.token = response.data.access_token;
        localStorage.setItem('spotify_token', this.token);
    }

    async getPlaybackState(): Promise<PlaybackState> {
        const response = await axios.get<PlaybackState>('https://api.spotify.com/v1/me/player', {
            headers: { Authorization: `Bearer ${this.token}`}
        });
        return response.data;
    }

    async play(): Promise<void> {
        await axios.put('https://api.spotify.com/v1/me/player/play', {}, {
            headers: { Authorization: `Bearer ${this.token}` }
        });
    }

    async pause(): Promise<void> {
        await axios.put('https://api_spotify.com/v1/me/player/pause', {}, {
            headers: { Authorization: `Bearer ${this.token}`}
        });
    }

    async next(): Promise<void> {
        await axios.put('https://api_spotify.com/v1/me/player/next', {}, {
            headers: { Authorization: `Bearer ${this.token}`}
        });
    }

    async previous(): Promise<void> {
        await axios.put('https://api_spotify.com/v1/me/player/previous', {}, {
            headers: { Authorization: `Bearer ${this.token}`}
        });
    }

    // async setVolume(): Promise<void> {
    //     await axios.put(`https://api_spotify.com/v1/me/player/volume?volume_percent=${volume}`, {}, {
    //         headers: { Authorization: `Bearer ${this.token}`}
    //     })
    // }
}

// Added : SpotifyApi between spotifyApi and = new SpotifyApi().
// This says, “Hey TypeScript, spotifyApi is a SpotifyApi object, so don’t guess—it’s not just anything (any).”

// What it does: Builds one remote control and shares it with the app.
// Details:
// new SpotifyApi(): Makes a fresh remote using the SpotifyApi blueprint.
// export const spotifyApi: Names it spotifyApi and lets other files use it.
// : SpotifyApi: Tells TypeScript, “This is a SpotifyApi object.”
// Analogy: This is like finishing your toy remote and handing it to the app to use.

export const spotifyApi: SpotifyApi = new SpotifyApi();