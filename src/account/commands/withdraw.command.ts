import { ICommand } from "@nestjs/cqrs";

export class WithdrawCommand implements ICommand {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number
  ) {}
}
