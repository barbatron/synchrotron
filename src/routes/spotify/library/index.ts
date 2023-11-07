import type { ElysiaApp } from "../../../app";
import { childLogger } from "../../../plugins/logging";
import { spotifySdkPlugin } from "../../../plugins/spotify/spotifySdkPlugin";

const logger = childLogger(import.meta.file);

export default (app: ElysiaApp) =>
  app.use(spotifySdkPlugin).get(
    "/",
    async ({ set, spotify }) => {
      const spotifySdk = spotify.sdk;
      if (!spotifySdk) return;
      const playlists = await spotifySdk?.currentUser?.playlists.playlists(10);
      logger.info({ playlists }, "Got playlists");
      set.headers["Content-Type"] = "text/html";
      return `<ul>${playlists.items.map((pl) => `<li>${pl.name}</li>`)}</ul>`;
    },
    {
      beforeHandle: async ({ spotify, set }) => {
        if (spotify.authNeeded && spotify.url) {
          set.redirect = spotify.url;
          set.status = "Temporary Redirect";
          return "Auth needed";
        }
      },
    }
  );
