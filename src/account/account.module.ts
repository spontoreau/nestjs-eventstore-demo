import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AccountController } from "./account.controller";

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: []
})
export class BookModule {
  
}