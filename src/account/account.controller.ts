import { Controller, Post, Param, Patch, Body } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCommand } from "./commands/create.command";
import { DepositeCommand } from "./commands/deposite.command";
import { WithdrawCommand } from "./commands/withdraw.command";

@Controller("account")
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @Post(":id")
  async createAccount(
    @Param()
    id: string
  ) {
    await this.commandBus.execute(new CreateCommand(id));
  }

  @Patch(":id/deposite")
  async deposite(
    @Param()
    id: string,
    @Body()
    data: { amount : number }
  ) {
    await this.commandBus.execute(new DepositeCommand(id, data.amount));
  }

  @Patch(":id/withdraw")
  async withdraw(
    @Param()
    id: string,
    @Body()
    data: { amount : number }
  ) {
    await this.commandBus.execute(new WithdrawCommand(id, data.amount));
  }
}