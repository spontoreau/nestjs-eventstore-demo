import { Controller, Post, Param, Patch, Body } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCommand } from "./commands/create.command";
import { DepositeCommand } from "./commands/deposite.command";
import { WithdrawCommand } from "./commands/withdraw.command";
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { CreateAccountParams } from "./models/params/create-account-params";
import { DepositeBody } from "./models/bodies/deposite-body";
import { DepositeParams } from "./models/params/deposite-params";
import { WithdrawParams } from "./models/params/withdraw-params";
import { WithdrawBody } from "./models/bodies/withdraw-body";

@Controller("account")
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(":id")
  async createAccount(@Param()
    params: CreateAccountParams
  ) {
    await this.commandBus.execute(new CreateCommand(params.id));
  }

  @Patch(":id/deposite")
  async deposite(
    @Param()
    params: DepositeParams,
    @Body()
    body: DepositeBody
  ) {
    await this.commandBus.execute(new DepositeCommand(params.id, body.amount));
  }

  @Patch(":id/withdraw")
  async withdraw(
    @Param()
    params: WithdrawParams,
    @Body()
    body: WithdrawBody
  ) {
    await this.commandBus.execute(new WithdrawCommand(params.id, body.amount));
  }
}
