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

  async exists(streamName: string) {
    if(!streamName) {
      throw new EventStoreException("streamName is required!");
    }

    return await this.client.checkStreamExists(streamName);
  }

  async createEvent(event: Event) {
    if(!event) {
      throw new EventStoreException("Event is required!");
    }

    const exists = await this.exists(event.streamName);

    if(!exists) {
      throw new EventStoreException(`Unknow stream: ${ event.streamName }!`)
    }

    this.client.writeEvent(event.streamName, event.type, event.data);
  }

  async getEvents(streamName: string) {
    if(!streamName) {
      throw new EventStoreException("streamName is required!");
    }

    const exists = await this.exists(streamName);

    if(!exists) {
      throw new EventStoreException(`Unknow stream: ${ streamName }!`)
    }

    return await this.client.getAllStreamEvents(streamName);
  }
}