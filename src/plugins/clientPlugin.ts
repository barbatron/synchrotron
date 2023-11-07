import Elysia from "elysia";
import { childLogger } from "./logging";

const logger = childLogger(import.meta.file);

export const clientPlugin = new Elysia({ name: "clientPlugin" }).derive(
  ({ cookie: { client_id } }) => {
    if (client_id.value) {
      const clientId = client_id.value;
      logger.info({ clientId }, "Already had client id");
      return { clientId: client_id.value };
    }

    const clientId = crypto.randomUUID();
    logger.info({ clientId }, "assigning new client id");
    client_id.value = clientId;

    return { clientId };
  }
);

export type ClientPluginElysiaApp = typeof clientPlugin;
