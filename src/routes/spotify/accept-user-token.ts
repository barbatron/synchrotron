import type { ElysiaApp } from "../../app";
import { spotify } from "../../config";

interface SpotifyAuthRedirectParams {
  code: string;
  state: string;
}

// Callback from Spotify oauth
export default (app: ElysiaApp) =>
  app.get("/", async ({ set, query }) => {
    console.log("GET accept-user-token", { query });
    const { state, code } = query ?? {};

    if (!state) {
      set.redirect = "/error?reason=state_mismatch";
      return;
    }

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

    const data = await response.json();
    console.log("Got spotify token", { data });
  });
