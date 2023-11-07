import Elysia from "elysia";
import { clientPlugin } from "../clientPlugin";
import { spotifySdkForClient } from "./sdkBuilder";
import { childLogger } from "../logging";
import { spotify } from "../../config";
import { getAuthorizeUrlForScopes } from "./utils";

const logger = childLogger(import.meta.file);

export const spotifySdkPlugin = new Elysia({ name: "spotifySdk" })
  .use(clientPlugin)
  .derive(async ({ path, clientId, set }) => {
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
      const { url, state } = getAuthorizeUrlForScopes(clientId, scopes, path);
      // logger.info({ url, state }, "Redirecting user to Spotify auth");
      // set.redirect = url.toString();
      // set.status = 302;
      return { spotify: { authNeeded: true, url, state } };
    }
    return { spotify: { authNeeded: false, sdk } };
  });

export type SpotifySdkElysiaApp = typeof spotifySdkPlugin;
