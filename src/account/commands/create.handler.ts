import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { CreateCommand } from "./create.command";
import { AccountRepository } from "../repositories/account.repository";
import { AccountAggregate } from "../aggregates/account.aggregate";
import { AccountAlreadyExistsException } from "../errors/account-already-exists-exception";

@CommandHandler(CreateCommand)
export class CreateCommandHandler implements ICommandHandler<CreateCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AccountRepository
  ) {}

  async execute(command: CreateCommand): Promise<void> {
    const aggregate = await this.repository.get(command.accountNumber);

    if (!!aggregate) {
      throw new AccountAlreadyExistsException(command.accountNumber);
    } else {
      const aggregate = this.publisher.mergeObjectContext(
        new AccountAggregate(command.accountNumber)
      );
      aggregate.create();
      aggregate.commit();
    }
  }
}
