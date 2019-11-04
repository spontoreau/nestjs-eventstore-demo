import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class Created extends Event {
  constructor(aggregatedId: string) {
    super(`account-${aggregatedId}`, EventType.Created);
  }
}
