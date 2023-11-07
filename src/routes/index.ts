import type { ElysiaApp } from "../app";
import { childLogger } from "../plugins/logging";
import path from "path";

const logger = childLogger(path.dirname(import.meta.path));

export default (app: ElysiaApp) =>
  app
    .get(
      "/",
      () => {
        logger.debug("GET / routes index handler");
        return "Hello";
      },
      {
        beforeHandle({ set, cookie: { client_id } }) {
          // logger.debug({ value: client_id }, "GET / beforeHandle");
          set.redirect = "https://sunet.se";
          return "Redir";
        },
        afterHandle({ cookie: { client_id } }) {
          // logger.debug({ value: client_id }, "GET / afterHandle");
        },
      }
    )

    .get("/healthz", () => ({
      status: "ok",
      localTime: new Date().toString(),
    }));
