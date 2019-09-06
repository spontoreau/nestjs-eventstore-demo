import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from './event-store/event-store.module';

@Module({
  imports: [CqrsModule, EventStoreModule, AccountModule],
})
export class AppModule {}
