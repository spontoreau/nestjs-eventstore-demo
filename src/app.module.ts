import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { CqrsModule } from '@nestjs/cqrs';
import { StoreModule } from './store/store.module';

@Module({
  imports: [CqrsModule, StoreModule, AccountModule],
})
export class AppModule {}
