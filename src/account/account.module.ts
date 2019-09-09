import { Module, OnModuleInit } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { EventBus, CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { EventStorePublisher } from "../event-store/event-store.publisher";
import { EventStoreModule } from "../event-store/event-store.module";
import { CreateCommandHandler } from "./commands/create.handler";
import { DepositeCommandHandler } from "./commands/deposite.handler";
import { WithdrawCommandHandler } from "./commands/withdraw.handler";
import { AccountRepository } from "./repositories/account.repository";

@Module({
  controllers: [AccountController],
  imports: [CqrsModule, EventStoreModule, AccountModule],
  providers: [
    EventBus, 
    EventStorePublisher,
    EventPublisher,
    AccountRepository,
    CreateCommandHandler,
    DepositeCommandHandler,
    WithdrawCommandHandler
  ]
})
export class AccountModule implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStorePublisher
  ) {}
  onModuleInit() {
    this.eventBus.publisher = this.eventStore;
  }
}