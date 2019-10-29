import { AggregateRoot, IEvent } from "@nestjs/cqrs";
import { Created } from "../events/created.event";
import { Deposited } from "../events/deposited.event";
import { Withdrew } from "../events/withdrew.event";
import { isValidEvent } from "../../event-store/event-utils";

export class AccountAggregate extends AggregateRoot {
  state!: AccountState;

  constructor(private readonly aggregateId: string) {
    super();
  }

  create() {
    this.apply(new Created(this.aggregateId));
  }

  deposite(amount: number) {
    this.apply(
      new Deposited(this.aggregateId, new Date().toISOString(), amount)
    );
  }

  withdraw(amount: number) {
    this.apply(
      new Withdrew(this.aggregateId, new Date().toISOString(), amount)
    );
  }

  private onCreated(event: Created) {
    this.state = new AccountStateImpl(this.aggregateId);
  }

  private onDeposited(event: Deposited) {
    this.state.credit.push([event.data["date"], event.data["amount"]]);
  }

  private onWithdrew(event: Withdrew) {
    this.state.credit.push([event.data["date"], event.data["amount"]]);
  }

  protected getEventName(event): string {
    if(isValidEvent(event)) {
      return event.eventType;
    } else {
      return super.getEventName(event);
    }
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
