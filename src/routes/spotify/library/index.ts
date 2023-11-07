import type { ElysiaApp } from "../../../app";
import { spotify } from "../../../config";
import { clientPlugin } from "../../../plugins/clientPlugin";
import { childLogger } from "../../../plugins/logging";
import { spotifySdkForClient } from "../../../plugins/spotify/sdkBuilder";
import { getAuthorizeUrlForScopes } from "../../../plugins/spotify/utils";

const logger = childLogger(import.meta.file);

export default (app: ElysiaApp) =>
  app.use(clientPlugin).get(
    "/",
    async ({ clientId, set }) => {
      const spotifySdk = await spotifySdkForClient(clientId);
      if (!spotifySdk) return;
      const playlists = await spotifySdk?.currentUser?.playlists.playlists(10);
      logger.info({ playlists }, "Got playlists");
      set.headers["Content-Type"] = "text/html";
      return `<ul>${playlists.items.map((pl) => `<li>${pl.name}</li>`)}</ul>`;
    },
    {
      beforeHandle: async ({ path, clientId, set }) => {
        const sdk = await spotifySdkForClient(clientId);
        const authd = await sdk?.authenticate();
        if (!sdk || !authd?.authenticated) {
          logger.info(
            {
              clientId,
              path,
              hasSdk: !!sdk,
              wasAuthd: authd?.authenticated,
            },
            "no sdk or not auth'd for client - redir"
          );
          const scopes = spotify.scopes;
          const { url, state } = getAuthorizeUrlForScopes(
            clientId,
            scopes,
            path
          );
          logger.info({ url, state }, "Redirecting user to Spotify auth");
          set.redirect = url.toString();
          set.status = 302;
          return "Auth needed";
        }
      },
    }
  );
