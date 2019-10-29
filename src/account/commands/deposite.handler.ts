import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../repositories/account.repository";
import { DepositeCommand } from "./deposite.command";
import { UnknowAccountException } from "../errors/unknow-account-exception";

@CommandHandler(DepositeCommand)
export class DepositeCommandHandler
  implements ICommandHandler<DepositeCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AccountRepository
  ) {}

  async execute(command: DepositeCommand): Promise<void> {
    const accountAggregate = await this.repository.get(command.accountNumber);

    if (!accountAggregate) {
      throw new UnknowAccountException(command.accountNumber);
    }

    const aggregate = this.publisher.mergeObjectContext(accountAggregate);
    aggregate.deposite(command.amount);
    aggregate.commit();
  }
}
