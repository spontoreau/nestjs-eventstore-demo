import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class CreatedEvent extends Event {
  constructor(aggregatedId: string) {
    super(aggregatedId, EventType.Created);
  }
}
