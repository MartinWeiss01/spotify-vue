export interface User {
  isLoggedIn: boolean;

  // User Auth
  codeVerifier: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiration: number | null;

  // Profile Details
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  premium: boolean | null;
}