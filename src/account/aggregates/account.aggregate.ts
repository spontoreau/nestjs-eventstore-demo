import { AggregateRoot, IEvent } from "@nestjs/cqrs";
import { CreatedEvent } from "../events/created.event";
import { DepositedEvent } from "../events/deposited.event";
import { WithdrewEvent } from "../events/withdrew.event";
import { AccountEvent } from "../events/account.event";
import { Logger } from "@nestjs/common";

export interface AccountState {
  id: string;
  debit: Array<[string, number]>,
  credit: Array<[string, number]>,
  balance: number,
  isNegative: boolean
}

class AccountStateImpl implements AccountState {
  constructor(
    public readonly id: string,
    public debit: [string, number][] = [],
    public credit: [string, number][] = []
  ) {}
  
  get balance(): number {
    const debit = this.debit.map(d => d[1]).reduce((prev, current) => prev + current);
    const credit = this.credit.map(c => c[1]).reduce((prev, current) => prev + current);
    return credit - debit;
  }

  get isNegative(): boolean {
    return this.balance < 0;
  }
}

export class AccountAggregate extends AggregateRoot {
  state!: AccountState;

  constructor(
    private readonly aggregateId: string
  ) {
    super();

    this.state = new AccountStateImpl(this.aggregateId);
  }

  create() {
    this.apply(new CreatedEvent(this.aggregateId));
  }

  deposite(amount: number) {
    this.apply(new DepositedEvent(this.aggregateId, new Date().toISOString(), amount));
  }

  withdraw(amount: number) {
    this.apply(new WithdrewEvent(this.aggregateId, new Date().toISOString(), amount));
  }

  loadFromHistory(events: IEvent[]) {
    events.forEach(e => {
      if(!this.isValidEvent(e)) {
        Logger.warn(`Unknow event: ${ JSON.stringify(event) }`)
      } else {
        switch(e.type) {
          case "Deposited":
            this.state.debit.push([
              e.data["date"],
              e.data["amount"]
            ])
            break;
          case "Withdrew":
              this.state.credit.push([
                e.data["date"],
                e.data["amount"]
              ])
            break;
        }
      }
    });
  }

  private isValidEvent(value: any): value is AccountEvent {
    return value.streamName && value.type && value.data;
  }
}