import { IHandleErrors, SdkOptions, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { spotify } from "../../config";
import { tokenDb } from "./token-db";
import { childLogger } from "../logging";

const logger = childLogger(import.meta.file);

const sdkHooks: SdkOptions = {
  beforeRequest: (url, options) => {},
  afterRequest: (url, options, response) => {},
  errorHandler: new (class implements IHandleErrors {
    public async handleErrors(error: any): Promise<boolean> {
      logger.warn("Spotify SDK error");
      return false;
    }
  })(),
};

export const spotifySdkForClient = async (
  client: string
): Promise<SpotifyApi | null> => {
  if (!tokenDb.has(client)) return null;
  const data = tokenDb.get(client)!;
  const sdk = SpotifyApi.withAccessToken(spotify.clientId, data, sdkHooks);
  return sdk;
};
