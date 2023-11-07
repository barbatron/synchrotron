import Elysia from "elysia";
import { clientPlugin } from "../clientPlugin";
import { spotifySdkForClient } from "./sdkBuilder";
import { childLogger } from "../logging";
import { spotify } from "../../config";
import { getAuthorizeUrlForScopes } from "./utils";

const logger = childLogger(import.meta.file);

export const spotifySdkPlugin = new Elysia({ name: "spotifySdk" })
  .use(clientPlugin)
  .derive(async ({ path, clientId, set }) => {});

export type SpotifySdkElysiaApp = typeof spotifySdkPlugin;
