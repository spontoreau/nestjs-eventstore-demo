import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../repositories/account.repository";
import { DepositeCommand } from "./deposite.command";
import { WithdrawCommand } from "./withdraw.command";
import { UnknowAccountException } from "../errors/unknow-account-exception";
import { NotEnougthMoneyException } from "../errors/not-enought-money-exception";

@CommandHandler(WithdrawCommand)
export class WithdrawCommandHandler
  implements ICommandHandler<DepositeCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AccountRepository
  ) {}

  async execute(command: DepositeCommand): Promise<void> {
    const accountAggregate = await this.repository.get(command.accountNumber);

    if(!accountAggregate) {
      throw new UnknowAccountException(command.accountNumber);
    }

    if(command.amount > accountAggregate.state.balance) {
      throw new NotEnougthMoneyException(command.accountNumber);
    }

    const aggregate = this.publisher.mergeObjectContext(
      accountAggregate
    );
    aggregate.withdraw(command.amount);
    aggregate.commit();
  }
}
