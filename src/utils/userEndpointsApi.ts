import axios from "axios";
import Config from "@/config";

export const userEndpoints = axios.create({
  baseURL: Config.spotifyUserApi
})

export const setBearerToken = (token: string | undefined) => {
  userEndpoints.defaults.headers.common['Authorization'] = `Bearer ${token}`
}