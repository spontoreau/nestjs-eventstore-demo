import { ICommand } from "@nestjs/cqrs";

export class CreateCommand implements ICommand {
  constructor(
    public readonly accountNumber: string
  ) { }
}