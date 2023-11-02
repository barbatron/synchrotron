import type { ElysiaApp } from "../app";

export default (app: ElysiaApp) =>
  app
    .get("/", () => {})
    .get("/healthz", () => ({
      status: "ok",
      localTime: new Date().toString(),
    }));
