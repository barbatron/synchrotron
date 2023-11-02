import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { spotify as spotifyConfig } from "../config";

export const authorizeUrlForScopes = (scopes: string | string[]): URL => {
  const url = new URL("https://accounts.spotify.com/authorize");
  const state = crypto.randomUUID();
  const params = {
    response_type: "code",
    client_id: spotifyConfig.clientId,
    scope: Array.isArray(scopes) ? scopes.join(" ") : scopes,
    redirect_uri: spotifyConfig.redirectUri,
    state,
  };
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );
  return url;
};

export const sdkFromRedirect = (data: unknown) => {
  // SpotifyApi.withAccessToken("client-id", data);
};
