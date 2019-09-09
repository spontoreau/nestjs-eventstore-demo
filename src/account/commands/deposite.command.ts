import { ICommand } from "@nestjs/cqrs";

export class DepositeCommand implements ICommand {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number
  ) {}
}
