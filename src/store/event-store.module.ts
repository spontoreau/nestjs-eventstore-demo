import { Module, Global } from "@nestjs/common";
import { EventStoreConfiguration } from "./event-store.configuration";
import { EventStore } from "./event-store";
import { EventStorePublisher } from "./event-store.publisher";

@Global()
@Module({
  providers: [EventStoreConfiguration, EventStore],
  exports: [EventStorePublisher]
})
export class EventStoreModule { }