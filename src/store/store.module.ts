import { Module, Global } from "@nestjs/common";
import { EventStoreConfiguration } from "./event-store.configuration";

@Global()
@Module({
  providers: [EventStoreConfiguration],
  exports: []
})
export class StoreModule { }