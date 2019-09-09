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
    let debit = 0
    this.debit.forEach(d => debit += d[1]);
      
    let credit = 0;
    this.credit.forEach(c => credit += c[1]);
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
        switch(e.eventType) {
          case "Withdrew":
            this.state.debit.push([
              e.data["date"],
              e.data["amount"]
            ])
            break;
          case "Deposited":
              this.state.credit.push([
                e.data["date"],
                e.data["amount"]
              ])
            break;
        }
      }
    });
  }

  private isValidEvent(value: any): value is { streamId: string, eventType: string, data: Object } {
    return value.streamId && value.eventType && value.data;
  }
}