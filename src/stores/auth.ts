import { defineStore } from "pinia";
import { generateRandomString, generateCodeChallenge } from "@/utils/pkce"
import Config from "@/config";
import axios from "axios";
import { setBearerToken, userEndpoints } from "@/utils/userEndpointsApi";
import { reactive } from "vue";
import type { User } from "@/model/User";

const STORAGE_CODE_VERIFIER = "code_verifier"
const STORAGE_AUTH_CODE = "auth_code"
const STORAGE_ACCESS_TOKEN = "access_token"
const STORAGE_REFRESH_TOKEN = "refresh_token"
const STORAGE_TOKEN_EXPIRATION = "expires_in"

const scopes = [
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-private",
  "user-read-email",
];

export const useAuthStore = defineStore("auth", () => {
  const user: User = reactive({
    isLoggedIn: false,
    //Profile
    id: null,
    name: null,
    email: null,
    image: null,
    premium: null,
    //Tokens
    accessToken: null,
    refreshToken: null,
    expiration: null,
    //PKCE
    codeVerifier: null,
  })

  const getUserProfile = async () => {
    console.log("====================================")
    console.log(`[useAuthStore >> getUserProfile] Fetching user profile...`)
    try {
      const response = await userEndpoints.get("/me");
      console.log(`[useAuthStore >> getUserProfile] User profile fetched:`, response.data)
      user.id = response.data.id
      user.name = response.data.display_name
      user.email = response.data.email
      user.image = response.data.images && response.data.images.length > 0 ? response.data.images[0].url : "" //TODO: Handle no image
      user.premium = response.data.product === "premium"
    } catch (e) {
      console.error(e);
    }
    console.log(`[useAuthStore >> getUserProfile] Done fetching user profile.`)
  }

  const isTokenExpired = (): Boolean => {
    console.log("====================================")
    console.log(`[useAuthStore >> isTokenExpired] Checking if token is expired...`)
    if (!user.expiration) return true
    return new Date().getTime() > user.expiration;
  }

  const initUser = async (): Promise<void> => {
    console.log("====================================")
    console.log(`[useAuthStore >> initUser] Initializing user...`)
    user.codeVerifier = localStorage.getItem(STORAGE_CODE_VERIFIER)
    user.accessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN)
    user.refreshToken = localStorage.getItem(STORAGE_REFRESH_TOKEN)
    const exp = localStorage.getItem(STORAGE_TOKEN_EXPIRATION)
    user.expiration = exp ? parseInt(exp) : null

    if (user.accessToken && user.refreshToken) {
      console.log(`[useAuthStore >> initUser] User has access token and refresh token.`)
      if (!isTokenExpired()) {
        console.log(`[useAuthStore >> initUser] Token is valid.`)
        user.isLoggedIn = true
        setBearerToken(user.accessToken)
        await getUserProfile()
      } else {
        console.log(`[useAuthStore >> initUser] Token is expired.`)
        refreshAccessToken()
      }
    } else {
      console.log(`[useAuthStore >> initUser] User does not have access token and refresh token.`)
      user.isLoggedIn = false
    }
  }

  function redirectToAuth() {
    console.log("====================================")
    console.log(`[useAuthStore >> redirectToAuth] Redirecting to Spotify auth page...`)
    if (user.isLoggedIn) return; // If the user is already logged in, don't redirect to the Spotify auth page
    /*
      * Generate a random string codeVerifier and store it in local storage, we will need it for requesting an access token
      * Generate a secured tokens codeChallenge from the codeVerifier and state and redirect the user to the Spotify auth page
    */
    const codeVerifier: string = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      const state: string = generateRandomString(16);
      const scope: string = scopes.join(" ");

      localStorage.setItem(STORAGE_CODE_VERIFIER, codeVerifier);

      const args = new URLSearchParams({
        response_type: "code",
        client_id: Config.spotifyClientId,
        scope: scope,
        redirect_uri: Config.spotifyRedirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      const url = `https://accounts.spotify.com/authorize?${args}`;
      window.location.href = url;
    })
  }

  function getAuthCodeFromURL(): string | null {
    console.log("====================================")
    console.log(`[useAuthStore >> getAuthCodeFromURL] Fetching auth code from URL...`)
    /*
      * Check if the URL contains a parameter `code`
      * If so, store the code in local storage, needed for requesting an access token
    */
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      console.log(`[useAuthStore >> getAuthCodeFromURL] Auth code found in URL.`)
      localStorage.setItem(STORAGE_AUTH_CODE, code)
    } else {
      console.log(`[useAuthStore >> getAuthCodeFromURL] Auth code not found in URL.`)
    }
    return code
  }

  async function requestAccessToken() {
    console.log("====================================")
    console.log(`[useAuthStore >> requestAccessToken] Requesting access token...`)
    if (user.isLoggedIn) return; // If the user is already logged in, don't request a new access token

    /*
      * Fetch auth code from url to the local storage
      * Then check if the user has a code verifier and auth code in local storage
    */
    const authCode = getAuthCodeFromURL()

    if (!user.codeVerifier || !authCode) {
      console.log(`[useAuthStore >> requestAccessToken] User does not have code verifier or auth code.`)
      return;
    }

    const args = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: Config.spotifyRedirectUri,
      client_id: Config.spotifyClientId,
      code_verifier: user.codeVerifier,
    });

    try {
      const response = await axios.post("https://accounts.spotify.com/api/token", args)
      const { access_token, refresh_token, expires_in } = response.data;
      const expiration = new Date().getTime() + (expires_in * 1000);
      localStorage.setItem(STORAGE_ACCESS_TOKEN, access_token);
      localStorage.setItem(STORAGE_REFRESH_TOKEN, refresh_token);
      localStorage.setItem(STORAGE_TOKEN_EXPIRATION, expiration.toString());
      window.location.replace(Config.appUrl);
    } catch (e) {
      console.error(`[useAuthStore >> requestAccessToken] Error requesting access token.`, e)
    }
  }

  async function refreshAccessToken() {
    console.log("====================================")
    console.log(`[useAuthStore >> refreshAccessToken] Refreshing access token...`)
    if (!user.refreshToken) {
      console.log(`[useAuthStore >> refreshAccessToken] User does not have refresh token.`)
      return;
    }

    const args = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
      client_id: Config.spotifyClientId,
    });

    try {
      const response = await axios.post("https://accounts.spotify.com/api/token", args)
      const { access_token, expires_in } = response.data;
      console.log("refreshed access token", response.data)
      const expiration = new Date().getTime() + (expires_in * 1000);
      localStorage.setItem(STORAGE_ACCESS_TOKEN, access_token);
      localStorage.setItem(STORAGE_TOKEN_EXPIRATION, expiration.toString());
      location.reload()
    } catch (e) {
      console.error(`[useAuthStore >> refreshAccessToken] Error refreshing access token.`, e)
    }
  }

  function logout() {
    console.log("====================================")
    console.log(`[useAuthStore >> logout] Logging out...`)
    localStorage.removeItem(STORAGE_CODE_VERIFIER);
    localStorage.removeItem(STORAGE_AUTH_CODE);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_TOKEN_EXPIRATION);
    setBearerToken(undefined)
    window.location.href = Config.appUrl
  }

  const handleAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has("code")) {
      // Access granted
      await requestAccessToken()
    }

    window.location.replace(Config.appUrl)
  }

  return { user, initUser, redirectToAuth, requestAccessToken, logout, handleAuthCallback }
})