export default class Config {
  static spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  static spotifyRedirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
  static spotifyUserApi = import.meta.env.VITE_SPOTIFY_USER_API
  static appUrl = import.meta.env.VITE_APP_URL
}