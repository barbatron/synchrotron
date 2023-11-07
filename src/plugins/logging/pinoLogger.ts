import pino, { LoggerOptions } from "pino";
import { server } from "../../config";
import { applyDecorators } from "./decoration";

const doPretty = !server.isProduction;
// const prettyOpts: LoggerOptions = doPretty
//   ? {
//       transport: {
//         target: "pino-pretty",
//         options: {
//           colorize: true,
//           messageFormat: "[{context}] {message}",
//           ignore: "pid,hostname,message,context,req,res,responseTime",
//           errorLikeObjectKeys: ["err", "error"],
//         },
//       },
//     }
//   : {};

const loggerOpts = {
  messageKey: "message",
  timestamp: pino.stdTimeFunctions.isoTime,
  mixin: applyDecorators,
  // ...prettyOpts,
};

export const logger = pino(loggerOpts);
logger.level = "debug";

export const childLogger = (name: string) => {
  console.log("childLog name", name);
  return logger.child({}, { msgPrefix: `[${name}] ` });
};

logger.info({ doPretty }, "Logger configured");
