import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { CreateCommand } from "./create.command";
import { AccountRepository } from "../repositories/account.repository";
import { DomainException } from "../domain.exception";
import { AccountAggregate } from "../aggregates/account.aggregate";

@CommandHandler(CreateCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommand> {

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AccountRepository
  ) { }

  async execute(command: CreateCommand): Promise<void> {
    const accountExists = await this.repository.exists(command.accountNumber);

    if(accountExists) {
      throw new DomainException("Account number already exists.");
    } else {
      const aggregate = this.publisher.mergeObjectContext(
        new AccountAggregate(command.accountNumber)
      );
      aggregate.create();
      aggregate.commit();
    }
  }
}