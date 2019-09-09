import { Module } from "@nestjs/common";
import { EventStore } from "./event-store";
import { EventStorePublisher } from "./event-store.publisher";
import { EventStoreConfiguration } from "./event-store.configuration";

@Module({
  providers: [EventStore, EventStorePublisher, EventStoreConfiguration],
  exports: [EventStore, EventStorePublisher]
})
export class EventStoreModule {}
