import { ClientId } from "./token-db";
import { childLogger } from "../logging/pinoLogger";

const logger = childLogger(import.meta.file);

type StateRec = {
  clientId: ClientId;
  state: string;
  createdAt: string;
  returnUrl?: string;
};
const stateMap: Map<string, StateRec> = new Map();

const clientPendingStates = (clientId: string) =>
  Array.from(stateMap.values()).filter((r) => r.clientId === clientId);

export const createState = (clientId: string, returnUrl?: string) => {
  const clientRecs = clientPendingStates(clientId);
  if (clientRecs.length) {
    logger.warn({ clientRecs, clientId }, "New state for client");
  }

  const state = crypto.randomUUID();
  const rec = {
    clientId: clientId,
    state,
    createdAt: new Date().toISOString(),
    returnUrl,
  };
  stateMap.set(state, rec);
  return state;
};

export const verifyState = (state: string, clientId: string) => {
  const rec = stateMap.get(state);
  const clientRecs = clientPendingStates(clientId);
  logger.info({ rec, state, clientId, clientRecs }, "verifyState");
  const result = rec?.clientId === clientId;
  if (rec) stateMap.delete(state);
  return { result, stateRecord: rec };
};
