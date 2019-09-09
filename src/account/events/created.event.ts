import { IEvent } from "@nestjs/cqrs";
import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class CreatedEvent extends Event implements IEvent {
  constructor(aggregatedId: string) {
    super(aggregatedId, EventType.Created, {});
  }
}
