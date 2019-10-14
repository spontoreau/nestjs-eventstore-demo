import { Event } from "./event";

export function isValidEvent(
  value: any
): value is Event {
  return value.streamId && value.eventType && value.data && value.metadata;
};