import { defineStore } from "pinia";
import { generateRandomString, generateCodeChallenge } from "@/utils/pkce"
import Config from "@/config";
import axios from "axios";

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
];

export const useAuthStore = defineStore("auth", () => {

  function validateToken(): Boolean {
    /*
      * Check if the user has access and refresh token in local storage
      * If so, check if the access token is expired
        * If so, refresh the access token and return true
        * If not, return true
      * If not, return false
    */
    const access_token = localStorage.getItem(STORAGE_ACCESS_TOKEN);
    const refresh_token = localStorage.getItem(STORAGE_REFRESH_TOKEN);

    if (!access_token || !refresh_token) {
      return false
    }

    if (isTokenExpired()) {
      console.log("[VALIDATE TOKEN]", "Token is expired, refreshing token...")
      refreshAccessToken();
    } else {
      console.log("[VALIDATE TOKEN]", "User is already logged in and token is still valid")
    }
    return true
  }

  function isTokenExpired(): Boolean {
    const expiration = localStorage.getItem(STORAGE_TOKEN_EXPIRATION);
    if (!expiration) return true;
    return new Date().getTime() > parseInt(expiration);
  }

  function redirectToAuth() {
    if (validateToken()) return; // If the user is already logged in, don't redirect to the auth page (this should never happen
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

  function getAuthCodeFromURL() {
    /*
      * Check if the URL contains a parameter `code`
      * If so, store the code in local storage, needed for requesting an access token
    */
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) localStorage.setItem(STORAGE_AUTH_CODE, code);
    return code;
  }

  async function requestAccessToken() {
    if (validateToken()) return; // If the user is already logged in, don't request a new access token

    /*
      * Fetch auth code from url to the local storage
      * Then check if the user has a code verifier and auth code in local storage
    */
    const authCode = getAuthCodeFromURL()
    const codeVerifier = localStorage.getItem(STORAGE_CODE_VERIFIER);

    if (!codeVerifier || !authCode) {
      return;
    }

    const args = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: Config.spotifyRedirectUri,
      client_id: Config.spotifyClientId,
      code_verifier: codeVerifier,
    });

    try {
      const response = await axios.post("https://accounts.spotify.com/api/token", args)
      const { access_token, refresh_token, expires_in } = response.data;
      const expiration = new Date().getTime() + (expires_in * 1000);
      localStorage.setItem(STORAGE_ACCESS_TOKEN, access_token);
      localStorage.setItem(STORAGE_REFRESH_TOKEN, refresh_token);
      localStorage.setItem(STORAGE_TOKEN_EXPIRATION, expiration.toString());
    } catch (e) {
      console.error(e);
    }
  }

  async function refreshAccessToken() {
    const refresh_token = localStorage.getItem(STORAGE_REFRESH_TOKEN);
    if (!refresh_token) {
      return;
    }

    const args = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: Config.spotifyClientId,
    });

    try {
      const response = await axios.post("https://accounts.spotify.com/api/token", args)
      const { access_token, expires_in } = response.data;
      console.log("refreshed access token", response.data)
      const expiration = new Date().getTime() + (expires_in * 1000);
      localStorage.setItem(STORAGE_ACCESS_TOKEN, access_token);
      localStorage.setItem(STORAGE_TOKEN_EXPIRATION, expiration.toString());
    } catch (e) {
      console.error(e);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_CODE_VERIFIER);
    localStorage.removeItem(STORAGE_AUTH_CODE);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_TOKEN_EXPIRATION);
  }

  return { redirectToAuth, requestAccessToken, validateToken }
})