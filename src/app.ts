import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { server } from "./config";
import { childLogger } from "./plugins/logging";

const app = new Elysia({ name: "sychrotron" })
  .state({ logger: childLogger("app") })
  .use(
    autoroutes({
      routesDir: "./routes",
    })
  )
  .listen(server.port);

console.log(`Listening on port ${server.port}`);

export type ElysiaApp = typeof app;
