import { Controller, Post, Param, Patch, Body } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCommand } from "./commands/create.command";
import { DepositeCommand } from "./commands/deposite.command";
import { WithdrawCommand } from "./commands/withdraw.command";

@Controller("account")
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(":id")
  async createAccount(@Param()
  params: {
    id: string;
  }) {
    await this.commandBus.execute(new CreateCommand(params.id));
  }

  @Patch(":id/deposite")
  async deposite(
    @Param()
    params: { id: string },
    @Body()
    body: { amount: number }
  ) {
    await this.commandBus.execute(new DepositeCommand(params.id, body.amount));
  }

  @Patch(":id/withdraw")
  async withdraw(
    @Param()
    params: { id: string },
    @Body()
    body: { amount: number }
  ) {
    await this.commandBus.execute(new WithdrawCommand(params.id, body.amount));
  }
}
