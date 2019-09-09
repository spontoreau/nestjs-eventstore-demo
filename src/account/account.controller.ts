import { Controller, Post, Param, Patch, Body } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCommand } from "./commands/create.command";
import { DepositeCommand } from "./commands/deposite.command";
import { WithdrawCommand } from "./commands/withdraw.command";
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

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

class CreateAccountParams {
  @IsString()
  @IsNotEmpty()
  id: string;
}

class DepositeParams {
  @IsString()
  @IsNotEmpty()
  id: string;
}

class DepositeBody {
  @IsNumber()
  @Min(1)
  amount: number;
}

class WithdrawParams {
  @IsString()
  @IsNotEmpty()
  id: string ;
}

class WithdrawBody {
  @IsNumber()
  @Min(1)
  amount: number ;
}
