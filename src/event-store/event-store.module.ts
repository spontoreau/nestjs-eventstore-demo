import { Module, Global, OnModuleInit } from "@nestjs/common";
import { EventStoreConfiguration } from "./event-store.configuration";
import { EventStore } from "./event-store";
import { EventPublisher, EventBus } from "@nestjs/cqrs";
import { EventStorePublisher } from "./event-store.publisher";

@Global()
@Module({
  providers: [EventStoreConfiguration, EventPublisher, EventStore],
  exports: [EventStore]
})
export class EventStoreModule implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStorePublisher
  ) {}
  onModuleInit() {
    this.eventBus.publisher = this.eventStore;
  }
}