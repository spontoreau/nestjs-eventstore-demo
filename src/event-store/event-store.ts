import { TCPClient } from "geteventstore-promise";
import { EventStoreConfiguration } from "./event-store.configuration";
import { EventStoreException } from "./event-store.exception";
import { Event } from "./event";

export class EventStore {
  private client!: TCPClient;

  constructor(
    private configuration: EventStoreConfiguration
  ) {
    
  }

  connect() {
    this.client = new TCPClient(this.configuration.config);
  }

  close() {
    this.client.close();
  }

  createEvent(event: Event) {
    if(!event) {
      throw new EventStoreException("Event is required!");
    }

    const exists = this.client.checkStreamExists(event.streamName);

    if(!exists) {
      throw new EventStoreException(`Unknow stream: ${ event.streamName }!`)
    }

    this.client.writeEvent(event.streamName, event.type, event.data);
  }
}