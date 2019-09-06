import { TCPClient, EventFactory } from "geteventstore-promise";
import { EventStoreConfiguration } from "./event-store.configuration";

export class EventStore {
  private client!: TCPClient;

  constructor(
    private configuration: EventStoreConfiguration,
    private factory: EventFactory = new EventFactory()
  ) {
    
  }

  connect() {
    this.client = new TCPClient(this.configuration.config);
  }

  close() {
    this.client.close();
  }

  newEvent(type: string, data: object) {
    return this.factory.newEvent(type, data);
  }
}