import type { ElysiaApp } from "../../../app";
import { spotify } from "../../../config";
import { clientPlugin } from "../../../plugins/clientPlugin";
import { childLogger } from "../../../plugins/logging";
import { spotifySdkForClient } from "../../../plugins/spotify/sdkBuilder";
import { spotifySdkPlugin } from "../../../plugins/spotify/spotifySdkPlugin";
import { getAuthorizeUrlForScopes } from "../../../plugins/spotify/utils";

const logger = childLogger(import.meta.file);

export default (app: ElysiaApp) =>
  app.use(spotifySdkPlugin).get(
    "/",
    async ({ set, spotify }) => {
      const spotifySdk = spotify.sdk!;
      if (!spotifySdk) return;
      const playlists = await spotifySdk?.currentUser?.playlists.playlists(10);
      logger.info({ playlists }, "Got playlists");
      set.headers["Content-Type"] = "text/html";
      return `<ul>${playlists.items.map((pl) => `<li>${pl.name}</li>`)}</ul>`;
    },
    {
      beforeHandle: async ({ path, clientId, spotify, set }) => {
        if (spotify.authNeeded && spotify.url) {
          set.redirect = spotify.url;
          set.status = "Temporary Redirect";
          return "Auth needed";
        }
      },
    }
  );
