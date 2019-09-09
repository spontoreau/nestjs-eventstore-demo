import { AccountAggregate } from "../aggregates/account.aggregate";
import { EventStore } from "../../event-store/event-store";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepository {
  constructor(private readonly eventStore: EventStore) {}

  async get(aggregateId: string): Promise<AccountAggregate> {
    const exists = await this.eventStore.exists(aggregateId);

    if(!exists) {
      return undefined;
    }
    
    const events = await this.eventStore.getEvents(aggregateId);
    const aggregate = new AccountAggregate(aggregateId);
    aggregate.loadFromHistory(events);
    return aggregate;
  }
}
