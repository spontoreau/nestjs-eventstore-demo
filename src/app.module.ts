import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, AccountModule],
})
export class AppModule {}
