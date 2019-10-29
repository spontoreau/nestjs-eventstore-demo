import { TCPClient } from "geteventstore-promise";
import { EventStoreConfiguration } from "./event-store.configuration";
import { Event } from "./event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventStore {
  private client!: TCPClient;

  constructor(private configuration: EventStoreConfiguration) {}

  connect() {
    this.client = new TCPClient(this.configuration.config);
  }

  close() {
    this.client.close();
  }

  async exists(streamName: string) {
    return await this.client.checkStreamExists(streamName);
  }

  async createEvent(event: Event) {
    await this.client.writeEvent(
      event.streamId,
      event.eventType,
      event.data,
      event.metadata
    );
  }

  async getEvents(streamName: string) {
    return await this.client.getAllStreamEvents(streamName);
  }
}
