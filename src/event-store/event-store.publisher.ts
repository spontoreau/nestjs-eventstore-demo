import { IEvent, IEventPublisher } from "@nestjs/cqrs";
import { Injectable, Logger } from "@nestjs/common";
import { EventStore } from "./event-store";
import { Event } from "./event";
import { isValidEvent } from "./event-utils";

@Injectable()
export class EventStorePublisher implements IEventPublisher {
  constructor(private eventStore: EventStore) {
    this.eventStore.connect();
  }

  async publish<T extends IEvent>(event: T) {
    if (isValidEvent(event)) {
      await this.eventStore.createEvent(event);
    } else {
      Logger.warn(`Invalid event: ${JSON.stringify(event)}`);
    }
  }
}
