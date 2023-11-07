import Elysia from "elysia";
import { childLogger } from "./logging";

const logger = childLogger(import.meta.file);

export const clientPlugin = new Elysia({ name: "clientPlugin" }).derive(
  ({ cookie: { client_id } }) => {
    if (client_id.value) {
      const clientId = client_id.value;
      return { clientId };
    }

    const clientId = crypto.randomUUID();
    client_id.value = clientId;

    return { clientId };
  }
);

export type ClientPluginElysiaApp = typeof clientPlugin;
