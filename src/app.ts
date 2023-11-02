import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { server } from "./config";

const app = new Elysia()
  .use(
    autoroutes({
      routesDir: "./routes",
    })
  )
  .listen(server.port);

console.log(`Listening on port ${server.port}`);

export type ElysiaApp = typeof app;
