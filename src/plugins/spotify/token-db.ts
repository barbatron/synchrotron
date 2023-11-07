import { AccessToken } from "@spotify/web-api-ts-sdk";

export type ClientId = string;

export class SpotifyTokenDb {
  private readonly map = new Map<ClientId, AccessToken>();
  public has(client: ClientId) {
    return this.map.has(client);
  }
  public set(client: ClientId, accessToken: AccessToken) {
    return this.map.set(client, accessToken);
  }
  public get(client: ClientId): AccessToken | null {
    return this.map.get(client) ?? null;
  }
}

const tokenDb = new SpotifyTokenDb();

export { tokenDb };
