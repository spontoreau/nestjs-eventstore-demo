import { AggregateRoot, IEvent } from "@nestjs/cqrs";
import { CreatedEvent } from "../events/created.event";
import { DepositedEvent } from "../events/deposited.event";
import { WithdrewEvent } from "../events/withdrew.event";
import { Logger } from "@nestjs/common";
import { isValidEvent } from "src/event-store/event-utils";

export class AccountAggregate extends AggregateRoot {
  state!: AccountState;

  constructor(private readonly aggregateId: string) {
    super();
    this.state = new AccountStateImpl(this.aggregateId);
  }

  create() {
    this.apply(new CreatedEvent(this.aggregateId));
  }

  deposite(amount: number) {
    this.apply(
      new DepositedEvent(this.aggregateId, new Date().toISOString(), amount)
    );
  }

  withdraw(amount: number) {
    this.apply(
      new WithdrewEvent(this.aggregateId, new Date().toISOString(), amount)
    );
  }

  loadFromHistory(events: IEvent[]) {
    events.forEach(e => {
      if (!isValidEvent(e)) {
        Logger.warn(`Unknow event: ${JSON.stringify(event)}`);
      } else {
        switch (e.eventType) {
          case "Withdrew":
            this.state.debit.push([e.data["date"], e.data["amount"]]);
            break;
          case "Deposited":
            this.state.credit.push([e.data["date"], e.data["amount"]]);
            break;
        }
      }
    });
  }
}

interface AccountState {
  id: string;
  debit: Array<[string, number]>;
  credit: Array<[string, number]>;
  balance: number;
}

class AccountStateImpl implements AccountState {
  constructor(
    public readonly id: string,
    public debit: [string, number][] = [],
    public credit: [string, number][] = []
  ) {}

  get balance(): number {
    let debit = 0;
    this.debit.forEach(d => (debit += d[1]));

    let credit = 0;
    this.credit.forEach(c => (credit += c[1]));
    return credit - debit;
  }
}
