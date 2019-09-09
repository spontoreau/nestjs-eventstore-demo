import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../repositories/account.repository";
import { DomainException } from "../domain.exception";
import { DepositeCommand } from "./deposite.command";
import { EventStoreException } from "../../event-store/event-store.exception";
import { WithdrawCommand } from "./withdraw.command";

@CommandHandler(WithdrawCommand)
export class WithdrawCommandHandler
  implements ICommandHandler<DepositeCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AccountRepository
  ) {}

  async execute(command: DepositeCommand): Promise<void> {
    try {
      const aggregate = this.publisher.mergeObjectContext(
        await this.repository.get(command.accountNumber)
      );

      if (command.amount > aggregate.state.balance) {
        throw new DomainException("Not enought money.");
      }

      aggregate.withdraw(command.amount);
      aggregate.commit();
    } catch (e) {
      if (e instanceof EventStoreException) {
        throw new DomainException("Unknow account number.");
      }
    }
  }
}
