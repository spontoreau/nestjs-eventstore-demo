import { AccountEvent } from "./account.event";

export class CreatedEvent extends AccountEvent {
  constructor(aggregatedId: string) {
    super(aggregatedId, "Created", {});
  }
}
