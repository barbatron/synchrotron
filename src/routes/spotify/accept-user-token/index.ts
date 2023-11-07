import { AccessToken } from "@spotify/web-api-ts-sdk";
import type { ElysiaApp } from "../../../app";
import { spotify } from "../../../config";
import { clientPlugin } from "../../../plugins/clientPlugin";
import { childLogger } from "../../../plugins/logging";
import { verifyState } from "../../../plugins/spotify/stateSessions";
import { tokenDb } from "../../../plugins/spotify/token-db";

const logger = childLogger(import.meta.path.split("/").slice(-2).join("/"));

export default (app: ElysiaApp) =>
  app
    .use(clientPlugin)
    .get("/", async ({ clientId, set, query: { state, code } }) => {
      logger.info(
        { query: { state, code }, clientId },
        "GET accept-user-token"
      );

      if (!state) {
        set.redirect = "/error?reason=state_mismatch";
        return;
      }
      const authSession = verifyState(state, clientId);

      const formBody = new URLSearchParams({
        code: code ?? "",
        redirect_uri: spotify.redirectUri,
        grant_type: "authorization_code",
      });

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(spotify.clientId + ":" + spotify.clientSecret).toString(
            "base64"
          ),
      } satisfies Record<string, string>;

      const requestInit = {
        method: "POST",
        headers,
        body: formBody,
        verbose: true,
      };

      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        requestInit
      );

      const data = await response.json<AccessToken>();

      logger.info({ data }, "Got access token for client");

      tokenDb.set(clientId, data);

      if (authSession.result && authSession.stateRecord) {
        logger.info({ authSession }, "Returning to original location");
        set.redirect = authSession.stateRecord.returnUrl;
        return "Returning";
      }

      logger.warn("Not sure where to go - got token but no session found");
      set.redirect = "/";
      return "Returning";
    });
