
# Spotify Stats App

This app allows users to find out details about their music tastes based on their Spotify account.

The user will find an overview of their most listened to artists, songs and also the most frequently listened genres.

This overview can be obtained from the last 1 month, the last 6 months or the entire history of the account.

Users can also view their recently played tracks, find duplicates in their playlists and delete duplicated from selected playlist if wanted. 

# Security Policy

This app doesn't store any data on third party servers, whole app is completely client-sided only and call Spotify API endpoints only.
## Installation

After cloning this repository in your terminal, enter the commands 

```bash
  cd waf_ss2022_xweiss3
  npm install
```

NPM will download all the necessary packages at this point. Next, you need to create a ".env" file in the root of this application, into which you will insert the following variables:

```
VITE_SPOTIFY_CLIENT_ID=YOUR_APP_CLIENT_ID
VITE_SPOTIFY_REDIRECT_URI=http://localhost:8000/auth/spotify/callback
VITE_SPOTIFY_USER_API=https://api.spotify.com/v1
VITE_APP_URL=http://localhost:8000
```
## Generate app's Client ID

Visit the https://developer.spotify.com/dashboard and log in with your Spotify account.

Click on ‘Create app’ button.

Now you need to enter the App name and App description of your choice, Website is optional.

Redirect URI needs to be same as VITE_SPOTIFY_REDIRECT_URI in .env file, so by default it has to be 'http://localhost:8000/auth/spotify/callback'

Then, check the checkbox and click on ’Save’ button.

After creation, you can see your Client ID after clicking on ’Settings’ button.
Then, all you have to do is change value of VITE_SPOTIFY_CLIENT_ID variable in .env file to your actual Client ID.
### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).