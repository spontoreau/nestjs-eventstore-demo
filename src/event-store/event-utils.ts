import { Event } from "./event";

export function isValidEvent(value: any): value is Event {
  return (
    value.hasOwnProperty("streamId") &&
    value.hasOwnProperty("eventType") &&
    value.hasOwnProperty("data") &&
    value.hasOwnProperty("metadata")
  );
}
