import { spotify as spotifyConfig } from "../../config";
import { createState } from "./stateSessions";

export const getAuthorizeUrlForScopes = (
  clientId: string,
  scopes: string | string[],
  returnUrl?: string
): { url: string; state: string } => {
  const url = new URL("https://accounts.spotify.com/authorize");
  const state = createState(clientId, returnUrl);
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
  return { state, url: url.toString() };
};
