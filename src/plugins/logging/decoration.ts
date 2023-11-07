// Dynamic injection of logged metadata
const logEntryDecorators: Array<() => object> = [];

export function registerLogEntryDecorator(logEntryDecorator: () => object) {
  logEntryDecorators.push(logEntryDecorator);
}

export function applyDecorators() {
  return logEntryDecorators.reduce(
    (acc: object, logEntryDecorator) => ({ ...acc, ...logEntryDecorator() }),
    {}
  );
}
