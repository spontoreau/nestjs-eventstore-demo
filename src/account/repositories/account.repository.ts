import { AccountAggregate } from "../aggregates/account.aggregate";
import { EventStore } from "../../event-store/event-store";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepository {
  constructor(private readonly eventStore: EventStore) {}

  async exists(aggregateId): Promise<boolean> {
    return await this.eventStore.exists(aggregateId);
  }

  async get(aggregateId): Promise<AccountAggregate> {
    const events = await this.eventStore.getEvents(aggregateId);
    const aggregate = new AccountAggregate(aggregateId);
    aggregate.loadFromHistory(events);
    return aggregate;
  }
}
