import { authorizeUrlForScopes } from "../../api/spotifyApi";
import type { ElysiaApp } from "../../app";
import { spotify } from "../../config";

export default (app: ElysiaApp) =>
  app
    // Trigger auth flow
    .get("/", ({ set }) => {
      const scopes = spotify.scopes;
      const url = authorizeUrlForScopes(scopes);
      console.log("Redirecting user to Spotify auth", { url });
      set.redirect = url.toString();
    });
