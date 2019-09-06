export class EventStoreException extends Error {
  constructor(message: string) {
    super(message);
  }
}